import { ApiResponse } from "@app/core/api/models/api-response";
import { Observable } from "rxjs";
import { HttpOperations } from "./http-operations";
import { ReadRepository } from "./read-repository";

export class CrudRepository<T> extends ReadRepository<T> {

  constructor(
    private oper: HttpOperations
  ) {
    super(oper);
  }

  public create(data: T): Observable<ApiResponse<T>> {
    return this.oper.body(data).create();
  }

  public update(data: T): Observable<ApiResponse<T>> {
    return this.oper.body(data).update();
  }

  public updateById(id: number, data: T): Observable<ApiResponse<T>> {
    this.oper.appendRoute(`/${id}`);

    return this.oper.body(data).update();
  }

  public delete(): Observable<ApiResponse<boolean>> {
    return this.oper.delete();
  }

  public deleteById(id: number): Observable<ApiResponse<boolean>> {
    this.oper.appendRoute(`/${id}`);

    return this.oper.delete();
  }

}