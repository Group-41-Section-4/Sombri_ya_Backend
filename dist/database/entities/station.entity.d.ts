import { Umbrella } from './umbrella.entity';
import { Rental } from './rental.entity';
import type { Point } from 'geojson';
export declare class Station {
    id: string;
    description: string;
    place_name: string;
    latitude: number;
    longitude: number;
    location: Point;
    umbrellas: Umbrella[];
    started_rentals: Rental[];
    ended_rentals: Rental[];
}
