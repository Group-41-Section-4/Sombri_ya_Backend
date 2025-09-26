import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Plan } from '../entities/plan.entity';
import { Station } from '../entities/station.entity';
import { Umbrella } from '../entities/umbrella.entity';
export declare class InitialSeed {
    private readonly userRepository;
    private readonly planRepository;
    private readonly stationRepository;
    private readonly umbrellaRepository;
    constructor(userRepository: Repository<User>, planRepository: Repository<Plan>, stationRepository: Repository<Station>, umbrellaRepository: Repository<Umbrella>);
    run(): Promise<void>;
    createUsers(): Promise<void>;
    createPlans(): Promise<void>;
    createStations(): Promise<Station[]>;
    createUmbrellas(stations: Station[]): Promise<void>;
}
