import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('feature_logs')
export class FeatureLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: true })
  user_id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'boolean', default: false })
  is_bug: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @Column({ type: 'jsonb', nullable: true })
  details: object;

  @ManyToOne(() => User, (user) => user.feature_logs, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
