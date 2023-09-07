import { ApiResponse } from "@app/core/api/models/api-response";
import { Id } from "@app/core/authentication/models/id";
import { Observable } from "rxjs";
import { HttpOperations } from "./http-operations";
import { ReadRepository } from "./read-repository";

export class RelationshipRepository<T> extends ReadRepository<T> {

  constructor(
    private operationsProv: () => HttpOperations
  ) {
    super(operationsProv);
  }

  public create(data: Id): Observable<ApiResponse<boolean>> {
    const operations = this.operationsProv();

    return operations.body(data).create();
  }

  public update(data: Id): Observable<ApiResponse<boolean>> {
    const operations = this.operationsProv();

    return operations.body(data).update();
  }

  public delete(id: number): Observable<ApiResponse<boolean>> {
    const operations = this.operationsProv();

    return operations.appendRoute(`/${id}`).delete();
  }

}