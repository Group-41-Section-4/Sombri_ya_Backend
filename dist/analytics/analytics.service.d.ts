import { Repository, DataSource } from 'typeorm';
import { Rental } from '../database/entities/rental.entity';
import { User } from '../database/entities/user.entity';
import { FeatureLog } from '../database/entities/feature-log.entity';
import { AppOpenLog } from '../database/entities/app-open-log.entity';
import { WeatherService } from '../weather/weather.service';
import { Subscription } from '../database/entities/subscription.entity';
export declare class AnalyticsService {
    private readonly rentalRepo;
    private readonly userRepo;
    private readonly featureLogRepo;
    private readonly appOpenLogRepo;
    private readonly subscriptionRepo;
    private readonly weatherService;
    private readonly dataSource;
    constructor(rentalRepo: Repository<Rental>, userRepo: Repository<User>, featureLogRepo: Repository<FeatureLog>, appOpenLogRepo: Repository<AppOpenLog>, subscriptionRepo: Repository<Subscription>, weatherService: WeatherService, dataSource: DataSource);
    getAvailability(station_id: string): Promise<any>;
    getBookingsFrequency(start_date: string, end_date: string, group_by: string): Promise<any>;
    getUserHeatmap(start_date: string, end_date: string): Promise<any>;
    getStationHeatmap(start_date: string, end_date: string): Promise<any>;
    getTopFeatures(start_date: string, end_date: string, limit: number): Promise<any>;
    getNfcVsQr(start_date: string, end_date: string): Promise<{
        nfc: {
            uses: number;
            fails: number;
        };
        qr: {
            uses: number;
            fails: number;
        };
        nfc_failure_rate: number;
        qr_failure_rate: number;
    }>;
    getBiometricUsage(): Promise<{
        total_users: number;
        biometric_enabled_count: number;
        percent: number;
    }>;
    getRainProbability(lat: number, lon: number): Promise<any>;
}
