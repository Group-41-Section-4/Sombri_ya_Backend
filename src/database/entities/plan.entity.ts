import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Subscription } from './subscription.entity';

@Entity('plans')
export class Plan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'integer' })
  duration_days: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @OneToMany(() => Subscription, (subscription) => subscription.plan)
  subscriptions: Subscription[];
}
