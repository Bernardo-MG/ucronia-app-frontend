import { ApiResponse } from "@app/core/api/models/api-response";
import { Sort } from "@app/core/api/models/sort";
import { Observable } from "rxjs";
import { HttpOperations } from "../client/http-operations";
import { PaginatedResponse } from "../models/paginated-response";
import { PaginationRequest } from "../models/pagination-request";
import { ReadPaginatedRepository } from "./read-paginated-repository";

export class ReadRepository<T> {

  constructor(
    private operations: HttpOperations
  ) { }

  public readAll(): Observable<PaginatedResponse<T[]>> {
    return this.operations.read();
  }

  public readOne(): Observable<ApiResponse<T>> {
    return this.operations.read();
  }

  public parameter(name: string, value: any): ReadRepository<T> {
    this.operations = this.operations.parameter(name, value);

    return this;
  }

  public page(pagination: PaginationRequest | undefined): ReadPaginatedRepository<T> {
    this.operations.page(pagination);

    return new ReadPaginatedRepository<T>(this.operations);
  }

  public sort(sort: Sort<T>[] | undefined): ReadRepository<T> {
    this.operations.sort(sort);

    return this;
  }

}