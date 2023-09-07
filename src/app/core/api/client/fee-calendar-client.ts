import { FeeCalendarRange } from "@app/association/models/fee-calendar-range";
import { UserFeeCalendar } from "@app/association/models/user-fee-calendar";
import { HttpOperations } from "../repository/http-operations";
import { ReadRepository } from "../repository/read-repository";

export class FeeCalendarClient {

  constructor(
    private operationsProvider: () => HttpOperations
  ) { }

  public year(year: number): ReadRepository<UserFeeCalendar> {
    const operations = this.operationsProvider();

    operations.appendRoute(`/${year}`);
    return new ReadRepository<UserFeeCalendar>(() => operations);
  }

  public range(): ReadRepository<FeeCalendarRange> {
    const operations = this.operationsProvider();

    operations.appendRoute("/range");
    return new ReadRepository<FeeCalendarRange>(() => operations);
  }

}