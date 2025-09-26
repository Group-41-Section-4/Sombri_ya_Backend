import { Subscription } from './subscription.entity';
import { Rental } from './rental.entity';
import { PaymentMethod } from './payment-method.entity';
import { FeatureLog } from './feature-log.entity';
export declare class User {
    id: string;
    name: string;
    email: string;
    biometric_enabled: boolean;
    created_at: Date;
    subscriptions: Subscription[];
    rentals: Rental[];
    payment_methods: PaymentMethod[];
    feature_logs: FeatureLog[];
}
