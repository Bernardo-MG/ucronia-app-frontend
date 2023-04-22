import { Balance } from "@app/association/models/balance";
import { ReadOperations } from "@app/core/api/client/read-operations";
import { PaginatedResponse } from "@app/core/api/models/paginated-response";
import { PaginationRequest } from "@app/core/api/models/pagination-request";
import { Observable } from "rxjs";
import { Sort } from "../../models/sort";

export class BalanceQuery {

  private balanceRoute = "/balance";

  constructor(
    private readOperations: ReadOperations
  ) {
    this.readOperations.appendRoute(this.balanceRoute);
  }

  public read(): Observable<PaginatedResponse<Balance>> {
    return this.readOperations.fetch();
  }

  public parameter(name: string, value: any): BalanceQuery {
    this.readOperations = this.readOperations.parameter(name, value);

    return this;
  }

  public page(pagination: PaginationRequest | undefined): BalanceQuery {
    this.readOperations.page(pagination);

    return this;
  }

  public sort(sort: Sort<any>[] | undefined): BalanceQuery {
    this.readOperations.sort(sort);

    return this;
  }

}