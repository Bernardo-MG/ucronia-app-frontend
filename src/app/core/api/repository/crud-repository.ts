import { ApiResponse } from "@app/core/api/models/api-response";
import { Observable } from "rxjs";
import { Request } from "./request";
import { ReadRepository } from "./read-repository";

export class CrudRepository<T> extends ReadRepository<T> {

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

  public updateById(id: number, data: T): Observable<ApiResponse<T>> {
    const request = this.requestProvider();

    request.appendRoute(`/${id}`);

    return request.update(data);
  }

  public delete(): Observable<ApiResponse<boolean>> {
    const request = this.requestProvider();

    return request.delete();
  }

  public deleteById(id: number): Observable<ApiResponse<boolean>> {
    const request = this.requestProvider();

    request.appendRoute(`/${id}`);

    return request.delete();
  }

}