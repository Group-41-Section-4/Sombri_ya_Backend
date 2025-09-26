import { RentalsService } from './rentals.service';
import { StartRentalDto } from './dto/start-rental.dto';
import { EndRentalDto } from './dto/end-rental.dto';
import { RentalStatus } from '../database/entities/rental.entity';
export declare class RentalsController {
    private readonly rentalsService;
    constructor(rentalsService: RentalsService);
    start(startRentalDto: StartRentalDto): Promise<{
        rental_id: string;
        start_time: Date;
        status: RentalStatus;
        auth_attempts: number;
    }>;
    end(endRentalDto: EndRentalDto): Promise<{
        rental_id: string;
        end_time: Date;
        status: RentalStatus;
        duration_minutes: number;
        distance_meters: number;
    }>;
    find(user_id: string, status: RentalStatus): Promise<import("../database/entities/rental.entity").Rental[]>;
    findOne(id: string): Promise<import("../database/entities/rental.entity").Rental>;
}
