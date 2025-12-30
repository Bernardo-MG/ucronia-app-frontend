export class FeeUpdate {
  public month = new Date();
  public paid = false;
  public transaction: FeeUpdateTransaction | undefined;
  public member = -1;
}

export class FeeUpdateTransaction {
  public date: Date | undefined;
  public index = -1;
}
