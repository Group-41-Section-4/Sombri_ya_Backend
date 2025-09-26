import { User } from './user.entity';
import { Plan } from './plan.entity';
export declare enum SubscriptionStatus {
    ACTIVE = "active",
    EXPIRED = "expired",
    CANCELLED = "cancelled"
}
export declare class Subscription {
    id: string;
    user_id: string;
    plan_id: string;
    start_date: Date;
    end_date: Date;
    status: SubscriptionStatus;
    user: User;
    plan: Plan;
}
