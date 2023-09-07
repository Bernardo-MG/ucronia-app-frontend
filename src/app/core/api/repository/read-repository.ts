import { ApiResponse } from "@app/core/api/models/api-response";
import { Observable } from "rxjs";
import { PaginatedResponse } from "../models/paginated-response";
import { PaginatedQuery } from "../request/paginated-query";
import { HttpOperations } from "./http-operations";

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

  public readById(id: number): Observable<ApiResponse<T>> {
    this.operations.appendRoute(`/${id}`);
    return this.operations.read();
  }

}