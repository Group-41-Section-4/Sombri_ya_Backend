import { Station } from './station.entity';
export declare enum UmbrellaState {
    AVAILABLE = "available",
    RENTED = "rented",
    MAINTENANCE = "maintenance"
}
export declare class Umbrella {
    id: string;
    station_id: string;
    state: UmbrellaState;
    last_maintenance_at: Date;
    station: Station;
}
