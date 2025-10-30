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

  @Column({type: 'decimal', precision: 10, scale: 2, default: 0.0,name: 'total_pedometer_km',})
  total_pedometer_km: number;
  
  @Column({ type: 'text', nullable: true })
  passwordResetTokenHash: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  passwordResetExpires?: Date | null;

  @Column({ type: 'int', default: 0 })
  passwordVersion!: number;
}
