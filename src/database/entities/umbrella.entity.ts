import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Station } from './station.entity';

export enum UmbrellaState {
  AVAILABLE = 'available',
  RENTED = 'rented',
  MAINTENANCE = 'maintenance',
}

@Entity('umbrellas')
export class Umbrella {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: UmbrellaState,
    default: UmbrellaState.AVAILABLE,
  })
  state: UmbrellaState;

  @CreateDateColumn({ type: 'timestamptz' })
  last_maintenance_at: Date;

  @ManyToOne(() => Station, (station) => station.umbrellas)
  @JoinColumn({ name: 'station_id' })
  station: Station;
}
