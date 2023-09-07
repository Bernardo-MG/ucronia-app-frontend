import { ApiResponse } from "@app/core/api/models/api-response";
import { Id } from "@app/core/authentication/models/id";
import { Observable } from "rxjs";
import { Request } from "./request";
import { ReadRepository } from "./read-repository";

export class RelationshipRepository<T> extends ReadRepository<T> {

  constructor(
    private requestsProv: () => Request
  ) {
    super(requestsProv);
  }

  public create(data: Id): Observable<ApiResponse<boolean>> {
    const request = this.requestsProv();

    return request.body(data).create();
  }

  public update(data: Id): Observable<ApiResponse<boolean>> {
    const request = this.requestsProv();

    return request.body(data).update();
  }

  public delete(id: number): Observable<ApiResponse<boolean>> {
    const request = this.requestsProv();

    return request.appendRoute(`/${id}`).delete();
  }

}