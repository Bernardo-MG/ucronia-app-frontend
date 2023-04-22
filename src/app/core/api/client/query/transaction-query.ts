import { Transaction } from "@app/association/models/transaction";
import { ReadOperations } from "@app/core/api/client/read-operations";
import { ApiResponse } from "@app/shared/utils/api/models/api-response";
import { PaginatedResponse } from "@app/shared/utils/api/models/paginated-response";
import { PaginationRequest } from "@app/shared/utils/api/models/pagination-request";
import { Sort } from "@app/shared/utils/api/models/sort";
import { Observable } from "rxjs";
import { CreateOperations } from "../create-operations";
import { DeleteOperations } from "../delete-operations";
import { UpdateOperations } from "../update-operations";
import { TransactionQueryById } from "./transaction-query-by-id";
import { TransactionRangeQuery } from "./transaction-range-query";

export class TransactionQuery {

  private memberRoute = '/transaction';

  constructor(
    private createOperations: CreateOperations,
    private readOperations: ReadOperations,
    private updateOperations: UpdateOperations,
    private deleteOperations: DeleteOperations
  ) {
    this.createOperations.appendRoute(this.memberRoute);
    this.readOperations.appendRoute(this.memberRoute);
    this.updateOperations.appendRoute(this.memberRoute);
    this.deleteOperations.appendRoute(this.memberRoute);
  }

  public create(data: Transaction): Observable<ApiResponse<Transaction>> {
    return this.createOperations.body(data).push();
  }

  public read(): Observable<PaginatedResponse<Transaction[]>> {
    return this.readOperations.fetch();
  }

  public id(id: number): TransactionQueryById {
    this.readOperations.appendRoute(`/${id}`);
    this.updateOperations.id(id);
    this.deleteOperations.id(id);
    return new TransactionQueryById(this.readOperations, this.updateOperations, this.deleteOperations);
  }

  public range(): TransactionRangeQuery {
    return new TransactionRangeQuery(this.readOperations);
  }

  public parameter(name: string, value: any): TransactionQuery {
    this.readOperations = this.readOperations.parameter(name, value);

    return this;
  }

  public page(pagination: PaginationRequest | undefined): TransactionQuery {
    this.readOperations.page(pagination);

    return this;
  }

  public sort(sort: Sort<any>[] | undefined): TransactionQuery {
    this.readOperations.sort(sort);

    return this;
  }

}