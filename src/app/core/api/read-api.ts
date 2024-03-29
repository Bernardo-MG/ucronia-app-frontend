import { ApiResponse } from "@app/core/api/models/api-response";
import { Observable } from "rxjs";
import { PaginatedQuery } from "./models/paginated-query";
import { PaginatedResponse } from "./models/paginated-response";
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

  public readById(id: any): Observable<ApiResponse<T>> {
    const request = this.requestProvider();

    request.appendRoute(`/${id}`);
    return request.read();
  }

  protected requestWithQuery(query: PaginatedQuery<any>): Request {
    const request = this.requestProvider();

    // Sort
    request.sort(query.sort);

    // Other parameters
    for (const key in query.parameters) {
      const value = query.parameters[key];
      if (value) {
        request.parameter(key, value);
      }
    }

    return request;
  }

}