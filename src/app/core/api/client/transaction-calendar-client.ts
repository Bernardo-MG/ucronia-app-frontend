import { Transaction } from "@app/association/models/transaction";
import { TransactionCalendarRange } from "@app/association/models/transaction-calendar-range";
import { AngularHttpOperations } from "../repository/angular-http-operations";
import { ReadRepository } from "../repository/read-repository";

export class TransactionCalendarClient {

  constructor(
    private operations: AngularHttpOperations
  ) { }

  public date(year: number, month: number): ReadRepository<Transaction> {
    this.operations.appendRoute(`/${year}/${month}`);
    return new ReadRepository<Transaction>(this.operations);
  }

  public range(): ReadRepository<TransactionCalendarRange> {
    this.operations.appendRoute("/range");
    return new ReadRepository<TransactionCalendarRange>(this.operations);
  }

}