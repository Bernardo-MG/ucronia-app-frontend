
export class FeePayment {
  public contact = new FeePaymentContact();
  public paymentDate = new FeePaymentTransaction();
  public months: Date[] = [];
}

export class FeePaymentTransaction {
  public date = new Date();
}

export class FeePaymentContact {
  public number = -1;
}