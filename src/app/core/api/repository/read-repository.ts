import { ApiResponse } from "@app/core/api/models/api-response";
import { Sort } from "@app/core/api/models/sort";
import { Observable } from "rxjs";
import { PaginatedResponse } from "../models/paginated-response";
import { PaginationRequest } from "../models/pagination-request";
import { HttpOperations } from "./http-operations";
import { PaginatedQuery } from "../request/paginated-query";

export class ReadRepository<T> {

  constructor(
    private operations: HttpOperations
  ) { }

  public readAll(query: PaginatedQuery<T>): Observable<PaginatedResponse<T[]>> {
    if (query.size > 0) {
      this.operations.parameter('size', query.size);
    }
    if (query.page > 0) {
      this.operations.parameter('page', query.page);
    }
    if (query.sort.length > 0) {
      this.operations.sort(query.sort);
    }
    if (query.defaultSort.length > 0) {
      this.operations.defaultSort(query.sort);
    }
    for (var key in query.parameters) {
      if (query.parameters.hasOwnProperty(key)) {
        this.operations.parameter(key, query.parameters[key]);
      }
    }
    return this.operations.read();
  }

  public readOne(): Observable<ApiResponse<T>> {
    return this.operations.read();
  }

  public parameter(name: string, value: any): ReadRepository<T> {
    this.operations = this.operations.parameter(name, value);

    return this;
  }

  public page(pagination: PaginationRequest | undefined): ReadRepository<T> {
    this.operations.page(pagination);

    return this;
  }

  public sort(sort: Sort<T>[] | undefined): ReadRepository<T> {
    this.operations.sort(sort);

    return this;
  }

  public defaultSort(sort: Sort<T>[] | undefined): ReadRepository<T> {
    this.operations.defaultSort(sort);

    return this;
  }

}