import { ApiResponse } from "@app/core/api/models/api-response";
import { Observable } from "rxjs";
import { PaginatedResponse } from "../models/paginated-response";
import { PaginatedQuery } from "../request/paginated-query";
import { Request } from "./request";

export class ReadRepository<T> {

  constructor(
    private operationsProvider: () => Request
  ) { }

  public readAll(query: PaginatedQuery<T>): Observable<PaginatedResponse<T[]>> {
    const operations = this.operationsProvider();

    if (query.size > 0) {
      operations.parameter('size', query.size);
    }
    if (query.page > 0) {
      operations.parameter('page', query.page);
    }
    if (query.sort.length > 0) {
      operations.sort(query.sort);
    }
    if (query.defaultSort.length > 0) {
      operations.defaultSort(query.sort);
    }
    for (var key in query.parameters) {
      if (query.parameters.hasOwnProperty(key)) {
        operations.parameter(key, query.parameters[key]);
      }
    }

    return operations.read();
  }

  public readOne(): Observable<ApiResponse<T>> {
    const operations = this.operationsProvider();

    return operations.read();
  }

  public readById(id: number): Observable<ApiResponse<T>> {
    const operations = this.operationsProvider();

    operations.appendRoute(`/${id}`);
    return operations.read();
  }

}