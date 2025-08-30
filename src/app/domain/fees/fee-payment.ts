
export class FeePayment {
  person = new FeePaymentPerson();
  paymentDate = new FeePaymentTransaction();
  months: Date[] = [];
}

export class FeePaymentTransaction {
  date = new Date();
}

export class FeePaymentPerson {
  number = -1;
}