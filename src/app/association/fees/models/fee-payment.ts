import { FeePaymentMember } from "./fee-payment-member";
import { FeePaymentTransaction } from "./fee-payment-transaction";

export class FeePayment {
  member = new FeePaymentMember();
  transaction = new FeePaymentTransaction();
  feeDates: Date[] = [];
}
