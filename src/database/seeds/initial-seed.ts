import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Plan } from '../entities/plan.entity';
import { Station } from '../entities/station.entity';
import { Umbrella, UmbrellaState } from '../entities/umbrella.entity';
import { v4 as uuidv4 } from 'uuid';
import { DeepPartial } from 'typeorm';

@Injectable()
export class InitialSeed {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
    @InjectRepository(Station)
    private readonly stationRepository: Repository<Station>,
    @InjectRepository(Umbrella)
    private readonly umbrellaRepository: Repository<Umbrella>,
  ) {}

  async run() {
    await this.createUsers();
    await this.createPlans();
    const stations = await this.createStations();
    await this.createUmbrellas(stations);
  }

  async createUsers() {
    const users: DeepPartial<User>[] = [];
    for (let i = 0; i < 50; i++) {
      users.push({
        name: `User ${i}`,
        email: `user${i}@example.com`,
        biometric_enabled: Math.random() > 0.5,
      });
    }
    await this.userRepository.save(users);
  }

  async createPlans() {
    const plans = [
      { name: 'Pay per use', duration_days: 0, price: 1.5 },
      { name: 'Monthly', duration_days: 30, price: 15 },
      { name: 'Annual', duration_days: 365, price: 150 },
    ];
    await this.planRepository.save(plans);
  }

  async createStations() {
    const stationsData = [
        { description: 'Main Square Station', place_name: 'Plaza Mayor', latitude: 40.415, longitude: -3.707 },
        { description: 'Retiro Park Station', place_name: 'Parque del Retiro', latitude: 40.414, longitude: -3.683 },
        { description: 'Prado Museum Station', place_name: 'Museo del Prado', latitude: 40.413, longitude: -3.692 },
        { description: 'Atocha Station', place_name: 'Estación de Atocha', latitude: 40.407, longitude: -3.690 },
        { description: 'Sol Station', place_name: 'Puerta del Sol', latitude: 40.417, longitude: -3.703 },
        { description: 'Gran Via Station', place_name: 'Gran Vía', latitude: 40.420, longitude: -3.705 },
        { description: 'Royal Palace Station', place_name: 'Palacio Real', latitude: 40.418, longitude: -3.714 },
        { description: 'Cibeles Station', place_name: 'Plaza de Cibeles', latitude: 40.419, longitude: -3.693 },
        { description: 'Debod Temple Station', place_name: 'Templo de Debod', latitude: 40.424, longitude: -3.718 },
        { description: 'Malasaña Station', place_name: 'Barrio de Malasaña', latitude: 40.426, longitude: -3.704 },
    ];

    const stations = stationsData.map(s => this.stationRepository.create({
        ...s,
        location: { type: 'Point', coordinates: [s.longitude, s.latitude] },
    }));

    return this.stationRepository.save(stations);
  }

  async createUmbrellas(stations: Station[]) {
    const umbrellas: DeepPartial<Umbrella>[] = [];
    for (const station of stations) {
      for (let i = 0; i < 5; i++) { // 5 umbrellas per station
        umbrellas.push({
          station_id: station.id,
          state: UmbrellaState.AVAILABLE,
        });
      }
    }
    await this.umbrellaRepository.save(umbrellas);
  }
}
