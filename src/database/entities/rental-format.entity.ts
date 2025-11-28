import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rental_formats')
export class RentalFormat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  someInt: number; // el entero que quieras guardar

  @Column({ type: 'varchar', length: 250 })
  description: string; // varchar(250)

  @Column({ type: 'bytea' })
  imageData: Buffer; // bytes de la imagen

  // Solo guardamos el id de la renta, sin relación TypeORM
  @Column({ type: 'uuid' })
  rentalId: string;
}
