import { HttpClient } from "@angular/common/http";
import { ApiResponse } from "@app/core/api/models/api-response";
import { PaginatedQuery } from "@app/core/api/models/paginated-query";
import { AngularRequest } from "@app/core/api/request/angular-request";
import { Request } from '@app/core/api/request/request';
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { MemberBalance } from "../members/models/member-balance";

export class MemberBalanceApi {

  constructor(
    private http: HttpClient
  ) { }

  public readMonthly(query: PaginatedQuery<MemberBalance>): Observable<ApiResponse<MemberBalance[]>> {
    return this.getRequest().query(query).read();
  }

  private getRequest(): Request {
    return new AngularRequest(this.http, environment.apiUrl + '/member/monthly');
  }

}