import { ApiResponse } from "@app/core/api/models/api-response";
import { Observable } from "rxjs";
import { PaginatedQuery } from "./models/paginated-query";
import { PaginatedResponse } from "./models/paginated-response";
import { Sort } from "./models/sort";
import { Request } from "./request/request";

export class ReadApi<T> {

  constructor(
    protected requestProvider: () => Request
  ) { }

  public readAll(query: PaginatedQuery<T>): Observable<PaginatedResponse<T[]>> {
    const request = this.requestWithQuery(query);

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

  protected requestWithQuery(query: PaginatedQuery<any>): Request {
    const request = this.requestProvider();

    // Sort
    if (query.sort.length > 0) {
      this.applySort(query.sort, request);
    } else if (query.defaultSort.length > 0) {
      this.applySort(query.defaultSort, request);
    }

    // Other parameters
    for (const key in query.parameters) {
      const value = query.parameters[key];
      if (value) {
        request.parameter(key, value);
      }
    }

    return request;
  }

  private applySort(sort: Sort<T>[], request: Request) {
    for (let i = 0; i < sort.length; i += 1) {
      const fieldSort = sort[i];
      request.parameter('sort', `${String(fieldSort.property)},${fieldSort.direction}`);
    }
  }

}