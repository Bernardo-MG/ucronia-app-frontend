import { FeeCalendarRange } from "@app/association/models/fee-calendar-range";
import { UserFeeCalendar } from "@app/association/models/user-fee-calendar";
import { ReadRepository } from "../../repository/read-repository";
import { AngularHttpOperations } from "../../repository/angular-http-operations";

export class FeeCalendarClient {

  constructor(
    private operations: AngularHttpOperations
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