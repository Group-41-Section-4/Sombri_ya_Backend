export declare class DateRangeDto {
    start_date: string;
    end_date: string;
}
export declare class TopFeaturesDto extends DateRangeDto {
    limit?: string;
}
export declare class BookingsFrequencyDto extends DateRangeDto {
    group_by: string;
}
export declare class RainProbabilityDto {
    lat: string;
    lon: string;
}
