import { ApiResponse } from "@app/core/api/models/api-response";
import { Observable } from "rxjs";
import { PaginatedResponse } from "../models/paginated-response";
import { PaginatedQuery } from "../request/paginated-query";
import { Request } from "./request";
import { Sort } from "../models/sort";

export class ReadRepository<T> {

  constructor(
    private requestProvider: () => Request
  ) { }

  public readAll(query: PaginatedQuery<T>): Observable<PaginatedResponse<T[]>> {
    const request = this.requestProvider();

    // Sort
    if (query.sort.length > 0) {
      this.applySort(query.sort, request);
    } else if (query.defaultSort.length > 0) {
      this.applySort(query.defaultSort, request);
    }

    // Other parameters
    for (var key in query.parameters) {
      if (query.parameters.hasOwnProperty(key)) {
        request.parameter(key, query.parameters[key]);
      }
    }

    return request.read();
  }

  public readOne(): Observable<ApiResponse<T>> {
    const request = this.requestProvider();

    return request.read();
  }

  public readById(id: number): Observable<ApiResponse<T>> {
    const request = this.requestProvider();

    request.appendRoute(`/${id}`);
    return request.read();
  }

  private applySort(sort: Sort<T>[], request: Request) {
    for (let i = 0; i < sort.length; i += 1) {
      const fieldSort = sort[i];
      request.parameter('sort', `${String(fieldSort.property)},${fieldSort.order}`);
    }
  }

}