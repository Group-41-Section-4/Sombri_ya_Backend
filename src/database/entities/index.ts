// Barrel export for all entities
// This centralizes entity imports and makes them cleaner throughout the app

export { User } from './user.entity';
export { Station } from './station.entity';
export { Umbrella } from './umbrella.entity';
export { Rental } from './rental.entity';
export { Plan } from './plan.entity';
export { Subscription } from './subscription.entity';
export { PaymentMethod } from './payment-method.entity';
export { FeatureLog } from './feature-log.entity';
export { AppOpenLog } from './app-open-log.entity';

// Now you can import like this:
// import { User, Station, Umbrella } from '../database/entities';
// instead of:
// import { User } from '../database/entities/user.entity';
// import { Station } from '../database/entities/station.entity';
// import { Umbrella } from '../database/entities/umbrella.entity';