import { User } from './user.entity';
import { Umbrella } from './umbrella.entity';
import { Station } from './station.entity';
import { PaymentMethod } from './payment-method.entity';
export declare enum RentalStatus {
    ONGOING = "ongoing",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
}
export declare enum AuthType {
    NFC = "nfc",
    QR = "qr"
}
export declare class Rental {
    id: string;
    user_id: string;
    umbrella_id: string;
    station_start_id: string;
    station_end_id: string;
    start_time: Date;
    end_time: Date;
    status: RentalStatus;
    duration_minutes: number;
    distance_meters: number;
    payment_method_id: string;
    auth_type: AuthType;
    auth_attempts: number;
    user: User;
    umbrella: Umbrella;
    start_station: Station;
    end_station: Station;
    payment_method: PaymentMethod;
}
