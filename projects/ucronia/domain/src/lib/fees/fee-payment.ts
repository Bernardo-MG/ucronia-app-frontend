
export class FeePayment {
  contact = new FeePaymentContact();
  paymentDate = new FeePaymentTransaction();
  months: Date[] = [];
}

export class FeePaymentTransaction {
  date = new Date();
}

export class FeePaymentContact {
  number = -1;
}