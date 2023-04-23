import { ApiResponse } from "@app/core/api/models/api-response";
import { Id } from "@app/core/authentication/models/id";
import { Observable } from "rxjs";
import { HttpOperations } from "./http-operations";
import { ReadRepository } from "./read-repository";

export class RelationshipRepository<T> extends ReadRepository<T> {

  constructor(
    private oper: HttpOperations
  ) {
    super(oper);
  }

  public create(data: Id): Observable<ApiResponse<boolean>> {
    return this.oper.body(data).create();
  }

  public update(data: Id): Observable<ApiResponse<boolean>> {
    return this.oper.body(data).update();
  }

  public delete(id: number): Observable<ApiResponse<boolean>> {
    return this.oper.appendRoute(`/${id}`).delete();
  }

}