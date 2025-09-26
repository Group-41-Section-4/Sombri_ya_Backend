import { DataSource, Repository } from 'typeorm';
import { Rental, RentalStatus } from '../database/entities/rental.entity';
import { Umbrella } from '../database/entities/umbrella.entity';
import { StartRentalDto } from './dto/start-rental.dto';
import { EndRentalDto } from './dto/end-rental.dto';
export declare class RentalsService {
    private readonly rentalRepository;
    private readonly umbrellaRepository;
    private readonly dataSource;
    constructor(rentalRepository: Repository<Rental>, umbrellaRepository: Repository<Umbrella>, dataSource: DataSource);
    start(startRentalDto: StartRentalDto): Promise<Rental>;
    end(endRentalDto: EndRentalDto): Promise<Rental>;
    find(user_id: string, status: RentalStatus): Promise<Rental[]>;
    findOne(id: string): Promise<Rental>;
}
