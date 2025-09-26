import { User } from './user.entity';
export declare class FeatureLog {
    id: string;
    user_id: string;
    name: string;
    is_bug: boolean;
    created_at: Date;
    details: object;
    user: User;
}
