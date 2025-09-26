import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

export enum PaymentMethodType {
  CARD = 'card',
  NFC = 'nfc',
  QR = 'qr',
  WALLET = 'wallet',
}

@Entity('payment_methods')
export class PaymentMethod {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'enum', enum: PaymentMethodType })
  type: PaymentMethodType;

  @Column({ type: 'jsonb' })
  meta: object;

  @ManyToOne(() => User, (user) => user.payment_methods)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
