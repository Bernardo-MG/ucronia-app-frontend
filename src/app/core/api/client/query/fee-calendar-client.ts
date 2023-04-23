import { FeeCalendarRange } from "@app/association/models/fee-calendar-range";
import { UserFeeCalendar } from "@app/association/models/user-fee-calendar";
import { ReadRepository } from "../../repository/read-repository";
import { HttpOperations } from "../../repository/http-operations";

export class FeeCalendarClient {

  constructor(
    private operations: HttpOperations
  ) { }

  public year(year: number): ReadRepository<UserFeeCalendar> {
    this.operations.appendRoute(`/${year}`);
    return new ReadRepository<UserFeeCalendar>(this.operations);
  }

  public range(): ReadRepository<FeeCalendarRange> {
    this.operations.appendRoute("/range");
    return new ReadRepository<FeeCalendarRange>(this.operations);
  }

}