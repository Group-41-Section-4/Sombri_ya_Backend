import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Station } from './station.entity';

@Entity('station_tags')
export class StationTag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Station, (station) => station.tags, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'station_id' })
  station: Station;

  @Column({ type: 'varchar', length: 128, unique: true })
  tag_uid: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  tag_type?: string;

  @Column({ type: 'jsonb', nullable: true })
  meta?: Record<string, any>;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
