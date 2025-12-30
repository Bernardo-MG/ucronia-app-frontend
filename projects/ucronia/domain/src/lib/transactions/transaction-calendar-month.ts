import { Transaction } from "./transaction";


export class TransactionCalendarMonth {
  public month = new Date();
  public transactions: Transaction[] = [];
}
