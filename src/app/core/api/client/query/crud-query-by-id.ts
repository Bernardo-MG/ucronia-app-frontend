import { ApiResponse } from "@app/core/api/models/api-response";
import { Observable } from "rxjs";
import { HttpOperations } from "../http-operations";

export class CrudQueryById<T> {

  constructor(
    private operations: HttpOperations
  ) { }

  public readOne(): Observable<ApiResponse<T>> {
    return this.operations.read();
  }

  public update(data: T): Observable<ApiResponse<T>> {
    return this.operations.body(data).update();
  }

  public delete(): Observable<ApiResponse<T>> {
    return this.operations.delete();
  }

}