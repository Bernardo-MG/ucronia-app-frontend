import { Transaction } from "@app/association/models/transaction";
import { TransactionCalendarRange } from "@app/association/models/transaction-calendar-range";
import { Request } from "../repository/request";
import { ReadRepository } from "../repository/read-repository";

export class TransactionCalendarClient {

  constructor(
    private operationsProvider: () => Request
  ) { }

  public date(year: number, month: number): ReadRepository<Transaction> {
    const operations = this.operationsProvider();

    operations.appendRoute(`/${year}/${month}`);
    return new ReadRepository<Transaction>(() => operations);
  }

  public range(): ReadRepository<TransactionCalendarRange> {
    const operations = this.operationsProvider();

    operations.appendRoute("/range");
    return new ReadRepository<TransactionCalendarRange>(() => operations);
  }

}