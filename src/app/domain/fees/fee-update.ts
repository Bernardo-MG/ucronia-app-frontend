export class FeeUpdate {
  month = new Date();
  paid = false;
  transaction: FeeUpdateTransaction | undefined;
  member = -1;
}

export class FeeUpdateTransaction {
  date: Date | undefined;
  index = -1;
}
