import { User } from './user.entity';
export declare enum PaymentMethodType {
    CARD = "card",
    NFC = "nfc",
    QR = "qr",
    WALLET = "wallet"
}
export declare class PaymentMethod {
    id: string;
    user_id: string;
    type: PaymentMethodType;
    meta: object;
    user: User;
}
