import { HttpClient } from "@angular/common/http";
import { CrudApi } from "@app/core/api/crud-api";
import { ApiResponse } from "@app/core/api/models/api-response";
import { PaginatedQuery } from "@app/core/api/models/paginated-query";
import { AngularRequest } from "@app/core/api/request/angular-request";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { Member } from "../members/models/member";
import { MemberBalance } from "../members/models/member-balance";

export class MemberApi extends CrudApi<Member> {

  constructor(
    private http: HttpClient
  ) {
    super(() => new AngularRequest(this.http, environment.apiUrl + '/member'))
  }

  public readMonthly(query: PaginatedQuery<MemberBalance>): Observable<ApiResponse<MemberBalance[]>> {
    const request = this.requestWithQuery(query);

    request.appendRoute('/monthly');

    return request.read();
  }

}