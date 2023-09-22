import { HttpClient } from "@angular/common/http";
import { CrudApi } from "@app/core/api/crud-api";
import { AngularRequest } from "@app/core/api/request/angular-request";
import { environment } from "environments/environment";
import { Member } from "../membership/models/member";
import { ApiResponse } from "@app/core/api/models/api-response";
import { PaginatedQuery } from "@app/core/api/models/paginated-query";
import { Observable } from "rxjs";
import { MonthlyBalance } from "../funds/models/monthly-balance";

export class MemberApi extends CrudApi<Member> {
    
  constructor(
    private http: HttpClient
  ) { 
    super(() => new AngularRequest(this.http, environment.apiUrl + '/member'))
  }

  public readMonthly(query: PaginatedQuery<MonthlyBalance>): Observable<ApiResponse<MonthlyBalance[]>> {
    const request = this.requestWithQuery(query);

    request.appendRoute('/monthly');

    return request.read();
  }

}