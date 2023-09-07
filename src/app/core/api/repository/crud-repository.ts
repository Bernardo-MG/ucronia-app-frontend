import { ApiResponse } from "@app/core/api/models/api-response";
import { Observable } from "rxjs";
import { Request } from "./request";
import { ReadRepository } from "./read-repository";

export class CrudRepository<T> extends ReadRepository<T> {

  constructor(
    private requestsProv: () => Request
  ) {
    super(requestsProv);
  }

  public create(data: T): Observable<ApiResponse<T>> {
    const request = this.requestsProv();

    return request.body(data).create();
  }

  public update(data: T): Observable<ApiResponse<T>> {
    const request = this.requestsProv();

    return request.body(data).update();
  }

  public updateById(id: number, data: T): Observable<ApiResponse<T>> {
    const request = this.requestsProv();

    request.appendRoute(`/${id}`);

    return request.body(data).update();
  }

  public delete(): Observable<ApiResponse<boolean>> {
    const request = this.requestsProv();

    return request.delete();
  }

  public deleteById(id: number): Observable<ApiResponse<boolean>> {
    const request = this.requestsProv();

    request.appendRoute(`/${id}`);

    return request.delete();
  }

}