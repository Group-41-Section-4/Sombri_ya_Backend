import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import type { Point } from 'geojson';

@Entity('app_open_logs')
export class AppOpenLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: true })
  user_id: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326, // WGS 84
  })
  location: Point;
}