import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, DataSource } from 'typeorm';
import { User } from '../database/entities/user.entity';
import { Rental, RentalStatus } from '../database/entities/rental.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Rental)
    private readonly rentalRepository: Repository<Rental>,
    private readonly dataSource: DataSource,
  ) {}

  /** --------- CRUD existentes --------- */

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.findOne(id);
      if (!user) {
        throw new NotFoundException(`User with ID "${id}" not found`);
      }
      Object.assign(user, updateUserDto);
      const updatedUser = await this.userRepository.save(user);
      return updatedUser;
    } catch (error) {
      console.error('❌ Error actualizando usuario:', error);
      throw error;
    }
  }

  /** --------- MÉTODOS NUEVOS: DELETE --------- */

  /**
   * Borrado lógico (soft delete).
   * Requiere que la entidad User tenga @DeleteDateColumn (p.ej. "deleted_at").
   * Evita que el actor se borre a sí mismo si pasas actorId.
   */
  async softDelete(id: string): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const user = await this.findOne(id);

    // if (actorId && actorId === id) {
    //   throw new ForbiddenException(
    //     'No puedes eliminar tu propia cuenta desde este endpoint.',
    //   );
    // }

    // Si no hay columna de soft delete, hacemos fallback seguro.
    const hasSoftDeleteColumn = this.userRepository.metadata.columns.some(
      (c) =>
        ['deletedAt', 'deleted_at'].includes(c.propertyName) ||
        c.databaseName === 'deleted_at',
    );

    if (!hasSoftDeleteColumn) {
      // Fallback: tratamos como hard delete con las mismas validaciones de rentals activos.
      await this.ensureNoActiveRentals(id);
      await this.userRepository.delete(id);
      return;
    }

    const res = await this.userRepository.softDelete(id);
    if (!res.affected) {
      throw new NotFoundException(
        `User with ID "${id}" not found or already deleted`,
      );
    }
  }

  /**
   * Borrado duro (hard delete). Verifica que no existan rentals activos.
   * Úsalo sólo si cumples políticas de retención/privacidad.
   */
  async hardDelete(id: string): Promise<void> {
    await this.findOne(id); // valida existencia
    await this.ensureNoActiveRentals(id);

    // Si hay FK con ON DELETE CASCADE, esto elimina en cascada.
    // Si no, considera borrar dependencias explícitamente en esta transacción.
    await this.dataSource.transaction(async (manager) => {
      await manager.delete(User, { id });
    });
  }

  async updateProfileImage(userId: string, profileImageUrl: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.profileImageUrl = profileImageUrl;
    return this.userRepository.save(user);
  }

  /** Verifica que el usuario no tenga rentals activos */
  private async ensureNoActiveRentals(userId: string): Promise<void> {
    const ACTIVE_STATUSES: RentalStatus[] = [
      // Ajusta a tus enums reales:
      // Ejemplos típicos:
      // RentalStatus.PENDING,
      // RentalStatus.IN_PROGRESS,
      // RentalStatus.RESERVED,
      // Si sólo conoces COMPLETED, asume que todo lo que NO es COMPLETED es activo.
    ];

    if (ACTIVE_STATUSES.length === 0) {
      // Estrategia alternativa: considera "activo" todo lo que no sea COMPLETED.
      const hasActive = await this.rentalRepository.exist({
        where: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          user: { id: userId } as any,
          status: In(
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            Object.values(RentalStatus).filter(
              (s) => s !== RentalStatus.COMPLETED,
            ) as any,
          ),
        },
      });
      if (hasActive) {
        throw new ConflictException(
          'El usuario tiene rentals activos. Finalízalos/ciérralos antes de eliminar.',
        );
      }
      return;
    }

    const hasActive = await this.rentalRepository.exist({
      where: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        user: { id: userId } as any,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        status: In(ACTIVE_STATUSES as any),
      },
    });
    if (hasActive) {
      throw new ConflictException(
        'El usuario tiene rentals activos. Finalízalos/ciérralos antes de eliminar.',
      );
    }
  }

  /** --------- LÓGICA de distancias / podómetro (tal cual tenías) --------- */

  async getTotalDistanceKm(
    userId: string,
  ): Promise<{ totalDistanceKm: number }> {
    const user = await this.findOne(userId); //
    const totalDistanceKm = Number(user.total_pedometer_km) || 0.0;

    return { totalDistanceKm: totalDistanceKm };
  }

  async addPedometerDistance(
    userId: string,
    distanceKm: number,
  ): Promise<User> {
    const user = await this.findOne(userId);
    const currentDistance = Number(user.total_pedometer_km) || 0.0;
    const newDistance = Number(distanceKm) || 0.0;

    user.total_pedometer_km = currentDistance + newDistance;

    return this.userRepository.save(user);
  }

  /** --------- Helpers --------- */

  private calculateHaversineDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371; // km
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) *
        Math.cos(this.toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}
