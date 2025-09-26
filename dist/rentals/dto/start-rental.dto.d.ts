import { AuthType } from '../../database/entities/rental.entity';
declare class GpsCoordDto {
    lat: number;
    lon: number;
}
export declare class StartRentalDto {
    user_id: string;
    umbrella_id: string;
    station_start_id: string;
    payment_method_id?: string;
    start_gps: GpsCoordDto;
    auth_type: AuthType;
}
export {};
