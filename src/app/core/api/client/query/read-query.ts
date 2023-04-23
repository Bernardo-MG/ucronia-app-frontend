import { ApiResponse } from "@app/core/api/models/api-response";
import { Sort } from "@app/core/api/models/sort";
import { Observable } from "rxjs";
import { PaginatedResponse } from "../../models/paginated-response";
import { PaginationRequest } from "../../models/pagination-request";
import { HttpOperations } from "../http-operations";

export class ReadQuery<T> {

  constructor(
    private operations: HttpOperations
  ) { }

  public readAll(): Observable<PaginatedResponse<T[]>> {
    return this.operations.read();
  }

  public readOne(): Observable<ApiResponse<T>> {
    return this.operations.read();
  }

  public parameter(name: string, value: any): ReadQuery<T> {
    this.operations = this.operations.parameter(name, value);

    return this;
  }

  public page(pagination: PaginationRequest | undefined): ReadQuery<T> {
    this.operations.page(pagination);

    return this;
  }

  public sort(sort: Sort<T>[] | undefined): ReadQuery<T> {
    this.operations.sort(sort);

    return this;
  }

}