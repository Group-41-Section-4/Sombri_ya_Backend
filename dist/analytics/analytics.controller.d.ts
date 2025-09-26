import { AnalyticsService } from './analytics.service';
import { DateRangeDto, TopFeaturesDto, BookingsFrequencyDto, RainProbabilityDto } from './dto/query-analytics.dto';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    getAvailability(station_id: string): Promise<any>;
    getBookingsFrequency(query: BookingsFrequencyDto): Promise<any>;
    getUserHeatmap(query: DateRangeDto): Promise<any>;
    getStationHeatmap(query: DateRangeDto): Promise<any>;
    getTopFeatures(query: TopFeaturesDto): Promise<any>;
    getNfcVsQr(query: DateRangeDto): Promise<{
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
    getRainProbability(query: RainProbabilityDto): Promise<any>;
}
