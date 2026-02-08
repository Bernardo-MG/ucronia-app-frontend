
export class FeePayments {
  public member = 0;
  public paymentDate = new FeePaymentTransaction();
  public months: Date[] = [];
}

export class FeePaymentTransaction {
  public date = new Date();
}

export class FeePaymentContact {
  public number = -1;
}