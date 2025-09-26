import { Subscription } from './subscription.entity';
export declare class Plan {
    id: string;
    name: string;
    duration_days: number;
    price: number;
    subscriptions: Subscription[];
}
