import { UserFeeCalendar } from "@app/association/models/user-fee-calendar";
import { ReadOperations } from "@app/core/api/client/read-operations";
import { PaginatedResponse } from "@app/core/api/models/paginated-response";
import { PaginationRequest } from "@app/core/api/models/pagination-request";
import { Observable } from "rxjs";
import { Sort } from "../../models/sort";

export class FeeCalendarQueryYear {

  constructor(
    private readOperations: ReadOperations
  ) {  }

  public read(): Observable<PaginatedResponse<UserFeeCalendar[]>> {
    return this.readOperations.fetch();
  }

  public parameter(name: string, value: any): FeeCalendarQueryYear {
    this.readOperations = this.readOperations.parameter(name, value);

    return this;
  }

  public page(pagination: PaginationRequest | undefined): FeeCalendarQueryYear {
    this.readOperations.page(pagination);

    return this;
  }

  public sort(sort: Sort<any>[] | undefined): FeeCalendarQueryYear {
    this.readOperations.sort(sort);

    return this;
  }

}