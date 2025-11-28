import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rental_formats')
export class RentalFormat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  someInt: number; // rating

  @Column({ type: 'varchar', length: 250, nullable: true })
  description?: string | null;

  @Column({ type: 'bytea', nullable: true })
  imageData?: Buffer | null;

  @Column({ type: 'uuid' })
  rentalId: string;
}
