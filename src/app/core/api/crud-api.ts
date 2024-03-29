import { ApiResponse } from "@app/core/api/models/api-response";
import { Observable } from "rxjs";
import { ReadApi } from "./read-api";
import { Request } from "./request/request";

export class CrudApi<T> extends ReadApi<T> {

  constructor(
    requestsProv: () => Request
  ) {
    super(requestsProv);
  }

  public create(data: T): Observable<ApiResponse<T>> {
    const request = this.requestProvider();

    return request.create(data);
  }

  public update(data: T): Observable<ApiResponse<T>> {
    const request = this.requestProvider();

    return request.update(data);
  }

  public updateById(id: any, data: T): Observable<ApiResponse<T>> {
    const request = this.requestProvider();

    request.appendRoute(`/${id}`);

    return request.update(data);
  }

  public delete(): Observable<ApiResponse<boolean>> {
    const request = this.requestProvider();

    return request.delete();
  }

  public deleteById(id: any): Observable<ApiResponse<boolean>> {
    const request = this.requestProvider();

    request.appendRoute(`/${id}`);

    return request.delete();
  }

  public patch(data: T): Observable<ApiResponse<T>> {
    const request = this.requestProvider();

    return request.patch(data);
  }

  public patchById<P>(id: any, data: P): Observable<ApiResponse<T>> {
    const request = this.requestProvider();

    request.appendRoute(`/${id}`);

    return request.patch(data);
  }

}