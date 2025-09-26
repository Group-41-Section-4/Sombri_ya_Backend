declare class GpsCoordDto {
    lat: number;
    lon: number;
}
export declare class EndRentalDto {
    rental_id: string;
    station_end_id?: string;
    end_gps?: GpsCoordDto;
}
export {};
