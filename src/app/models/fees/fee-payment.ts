
export class FeePayment {
  member = new FeePaymentMember();
  transaction = new FeePaymentTransaction();
  feeDates: Date[] = [];
}

export class FeePaymentTransaction {
  date = new Date();
}

export class FeePaymentMember {
  number = -1;
}