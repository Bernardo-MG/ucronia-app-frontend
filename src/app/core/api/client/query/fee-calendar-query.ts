import { FeeCalendarRange } from "@app/association/models/fee-calendar-range";
import { UserFeeCalendar } from "@app/association/models/user-fee-calendar";
import { HttpOperations } from "../http-operations";
import { ReadQuery } from "./read-query";

export class FeeCalendarQuery {

  constructor(
    private operations: HttpOperations
  ) { }

  public year(year: number): ReadQuery<UserFeeCalendar> {
    this.operations.appendRoute(`/${year}`);
    return new ReadQuery<UserFeeCalendar>(this.operations);
  }

  public range(): ReadQuery<FeeCalendarRange> {
    this.operations.appendRoute("/range");
    return new ReadQuery<FeeCalendarRange>(this.operations);
  }

}