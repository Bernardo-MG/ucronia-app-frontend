import { HttpClient } from "@angular/common/http";
import { ApiResponse } from "@app/core/api/models/api-response";
import { PaginatedQuery } from "@app/core/api/models/paginated-query";
import { ReadApi } from "@app/core/api/read-api";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { AngularRequest } from "../../core/api/request/angular-request";
import { MonthlyBalance } from "../funds/models/monthly-balance";

export class BalanceApi extends ReadApi<MonthlyBalance> {

  constructor(
    private http: HttpClient
  ) {
    super(() => new AngularRequest(this.http, environment.apiUrl + '/balance'))
  }

  public read(): Observable<ApiResponse<MonthlyBalance>> {
    const request = this.requestProvider();

    return request.read();
  }

  public readMonthly(query: PaginatedQuery<MonthlyBalance>): Observable<ApiResponse<MonthlyBalance[]>> {
    const request = this.requestWithQuery(query);

    request.appendRoute('/monthly');

    return request.read();
  }

}