import { ReadOperations } from "@app/core/api/client/read-operations";
import { PaginationRequest } from "@app/shared/utils/api/models/pagination-request";
import { Sort } from "@app/shared/utils/api/models/sort";
import { FeeCalendarQueryRange } from "./fee-calendar-query-range";
import { FeeCalendarQueryYear } from "./fee-calendar-query-year";

export class FeeCalendarQuery {

  private feeCalendarRoute = "/fee/calendar";

  constructor(
    private readOperations: ReadOperations
  ) {
    this.readOperations.appendRoute(this.feeCalendarRoute);
  }

  public year(year: number): FeeCalendarQueryYear {
    this.readOperations.appendRoute(`/${year}`);
    return new FeeCalendarQueryYear(this.readOperations);
  }

  public range(): FeeCalendarQueryRange {
    return new FeeCalendarQueryRange(this.readOperations);
  }

  public parameter(name: string, value: any): FeeCalendarQuery {
    this.readOperations = this.readOperations.parameter(name, value);

    return this;
  }

  public page(pagination: PaginationRequest | undefined): FeeCalendarQuery {
    this.readOperations.page(pagination);

    return this;
  }

  public sort(sort: Sort<any>[] | undefined): FeeCalendarQuery {
    this.readOperations.sort(sort);

    return this;
  }

}