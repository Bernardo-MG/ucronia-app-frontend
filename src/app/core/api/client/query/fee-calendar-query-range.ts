import { FeeCalendarRange } from "@app/association/models/fee-calendar-range";
import { ReadOperations } from "@app/core/api/client/read-operations";
import { PaginatedResponse } from "@app/core/api/models/paginated-response";
import { PaginationRequest } from "@app/core/api/models/pagination-request";
import { Observable } from "rxjs";
import { Sort } from "../../models/sort";

export class FeeCalendarQueryRange {

  private rangeRoute = "/range";

  constructor(
    private readOperations: ReadOperations
  ) {
    this.readOperations.appendRoute(this.rangeRoute);
  }

  public read(): Observable<PaginatedResponse<FeeCalendarRange>> {
    return this.readOperations.fetch();
  }

  public parameter(name: string, value: any): FeeCalendarQueryRange {
    this.readOperations = this.readOperations.parameter(name, value);

    return this;
  }

  public page(pagination: PaginationRequest | undefined): FeeCalendarQueryRange {
    this.readOperations.page(pagination);

    return this;
  }

  public sort(sort: Sort<any>[] | undefined): FeeCalendarQueryRange {
    this.readOperations.sort(sort);

    return this;
  }

}