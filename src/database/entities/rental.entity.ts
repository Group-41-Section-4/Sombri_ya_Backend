import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Umbrella } from './umbrella.entity';
import { Station } from './station.entity';
import { PaymentMethod } from './payment-method.entity';

export enum RentalStatus {
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum AuthType {
  NFC = 'nfc',
  QR = 'qr',
}

@Entity('rentals')
export class Rental {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'uuid' })
  umbrella_id: string;

  @Column({ type: 'uuid' })
  station_start_id: string;

  @Column({ type: 'uuid', nullable: true })
  station_end_id: string;

  @Column({ type: 'timestamptz' })
  start_time: Date;

  @Column({ type: 'timestamptz', nullable: true })
  end_time: Date;

  @Column({ type: 'enum', enum: RentalStatus, default: RentalStatus.ONGOING })
  status: RentalStatus;

  @Column({ type: 'integer', nullable: true })
  duration_minutes: number;

  @Column({ type: 'integer', nullable: true })
  distance_meters: number;

  @Column({ type: 'uuid', nullable: true })
  payment_method_id: string;

  @Column({ type: 'enum', enum: AuthType })
  auth_type: AuthType;

  @Column({ type: 'integer', default: 1 })
  auth_attempts: number;

  @ManyToOne(() => User, (user) => user.rentals)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Umbrella)
  @JoinColumn({ name: 'umbrella_id' })
  umbrella: Umbrella;

  @ManyToOne(() => Station, (station) => station.started_rentals)
  @JoinColumn({ name: 'station_start_id' })
  start_station: Station;

  @ManyToOne(() => Station, (station) => station.ended_rentals, { nullable: true })
  @JoinColumn({ name: 'station_end_id' })
  end_station: Station;

  @ManyToOne(() => PaymentMethod)
  @JoinColumn({ name: 'payment_method_id' })
  payment_method: PaymentMethod;
}
