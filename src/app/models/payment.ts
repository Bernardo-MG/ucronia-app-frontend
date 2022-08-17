import { PaymentType } from '@app/models/payment-type';

export class Payment {
    id: number = -1;
    description: string = '';
    day: number = -1;
    month: number = -1;
    year: number = -1;
    quantity: number = -1;
    type: PaymentType = PaymentType.Income;
}
