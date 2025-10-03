import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Subscription } from './subscription.entity';
import { Rental } from './rental.entity';
import { PaymentMethod } from './payment-method.entity';
import { FeatureLog } from './feature-log.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name?: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password?: string;

  @Column({ type: 'boolean', default: false })
  biometric_enabled: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @OneToMany(() => Subscription, (subscription) => subscription.user)
  subscriptions: Subscription[];

  @OneToMany(() => Rental, (rental) => rental.user)
  rentals: Rental[];

  @OneToMany(() => PaymentMethod, (paymentMethod) => paymentMethod.user)
  payment_methods: PaymentMethod[];

  @OneToMany(() => FeatureLog, (log) => log.user)
  feature_logs: FeatureLog[];
}
