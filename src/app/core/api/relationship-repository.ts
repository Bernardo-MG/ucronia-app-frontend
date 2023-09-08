import { ApiResponse } from "@app/core/api/models/api-response";
import { Id } from "@app/core/authentication/models/id";
import { Observable } from "rxjs";
import { ReadApi } from "./read-api";
import { Request } from "../request/request";

export class RelationshipRepository<T> extends ReadApi<T> {

  constructor(
    private requestsProv: () => Request
  ) {
    super(requestsProv);
  }

  public create(data: Id): Observable<ApiResponse<boolean>> {
    const request = this.requestsProv();

    return request.create(data);
  }

  public update(data: Id): Observable<ApiResponse<boolean>> {
    const request = this.requestsProv();

    return request.update(data);
  }

  public delete(id: number): Observable<ApiResponse<boolean>> {
    const request = this.requestsProv();

    return request.appendRoute(`/${id}`).delete();
  }

}