import { Fee } from "@app/association/models/fee";
import { ReadOperations } from "@app/core/api/client/read-operations";
import { ApiResponse } from "@app/shared/utils/api/models/api-response";
import { PaginatedResponse } from "@app/shared/utils/api/models/paginated-response";
import { PaginationRequest } from "@app/shared/utils/api/models/pagination-request";
import { Observable } from "rxjs";
import { CreateOperations } from "../create-operations";
import { DeleteOperations } from "../delete-operations";
import { UpdateOperations } from "../update-operations";
import { FeeQueryById } from "./fee-query-by-id";
import { Sort } from "@app/shared/utils/api/models/sort";

export class FeeQuery {

  private feeRoute = '/fee';

  constructor(
    private createOperations: CreateOperations,
    private readOperations: ReadOperations,
    private updateOperations: UpdateOperations,
    private deleteOperations: DeleteOperations
  ) {
    this.createOperations.appendRoute(this.feeRoute);
    this.readOperations.appendRoute(this.feeRoute);
    this.updateOperations.appendRoute(this.feeRoute);
    this.deleteOperations.appendRoute(this.feeRoute);
  }

  public create(data: Fee): Observable<ApiResponse<Fee>> {
    return this.createOperations.body(data).push();
  }

  public read(): Observable<PaginatedResponse<Fee[]>> {
    return this.readOperations.fetch();
  }

  public id(id: number): FeeQueryById {
    this.readOperations.appendRoute(`/${id}`);
    this.updateOperations.id(id);
    this.deleteOperations.id(id);
    return new FeeQueryById(this.readOperations, this.updateOperations, this.deleteOperations);
  }

  public parameter(name: string, value: any): FeeQuery {
    this.readOperations = this.readOperations.parameter(name, value);

    return this;
  }

  public page(pagination: PaginationRequest | undefined): FeeQuery {
    this.readOperations.page(pagination);

    return this;
  }

  public sort(sort: Sort<any>[] | undefined): FeeQuery {
    this.readOperations.sort(sort);

    return this;
  }

}