import { ApiResponse } from "@app/core/api/models/api-response";
import { Observable } from "rxjs";
import { Request } from "./request";
import { ReadRepository } from "./read-repository";

export class CrudRepository<T> extends ReadRepository<T> {

  constructor(
    private operationsProv: () => Request
  ) {
    super(operationsProv);
  }

  public create(data: T): Observable<ApiResponse<T>> {
    const operations = this.operationsProv();

    return operations.body(data).create();
  }

  public update(data: T): Observable<ApiResponse<T>> {
    const operations = this.operationsProv();

    return operations.body(data).update();
  }

  public updateById(id: number, data: T): Observable<ApiResponse<T>> {
    const operations = this.operationsProv();

    operations.appendRoute(`/${id}`);

    return operations.body(data).update();
  }

  public delete(): Observable<ApiResponse<boolean>> {
    const operations = this.operationsProv();

    return operations.delete();
  }

  public deleteById(id: number): Observable<ApiResponse<boolean>> {
    const operations = this.operationsProv();

    operations.appendRoute(`/${id}`);

    return operations.delete();
  }

}