import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Umbrella } from './umbrella.entity';
import { Rental } from './rental.entity';
import { StationTag } from './station-tag.entity';
import type { Point } from 'geojson';

@Entity('stations')
export class Station {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  place_name: string;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  longitude: number;

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326, // WGS 84
    nullable: true,
  })
  location: Point;

  @OneToMany(() => Umbrella, (umbrella) => umbrella.station)
  umbrellas: Umbrella[];

  @OneToMany(() => Rental, (rental) => rental.start_station)
  started_rentals: Rental[];

  @OneToMany(() => Rental, (rental) => rental.end_station)
  ended_rentals: Rental[];

  @OneToMany(() => StationTag, (tag) => tag.station)
  tags: StationTag[];
}
