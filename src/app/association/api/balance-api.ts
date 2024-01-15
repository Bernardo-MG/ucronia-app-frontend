import { HttpClient } from "@angular/common/http";
import { ApiResponse } from "@app/core/api/models/api-response";
import { PaginatedQuery } from "@app/core/api/models/paginated-query";
import { ReadApi } from "@app/core/api/read-api";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { AngularRequest } from "../../core/api/request/angular-request";
import { TransactionMonthlyBalance } from "../transactions/models/transaction-monthly-balance";
import { TransactionCurrentBalance } from "../transactions/models/transaction-current-balance";

export class BalanceApi extends ReadApi<TransactionMonthlyBalance> {

  constructor(
    private http: HttpClient
  ) {
    super(() => new AngularRequest(this.http, environment.apiUrl + '/funds/balance'))
  }

  public current(): Observable<ApiResponse<TransactionCurrentBalance>> {
    const request = this.requestProvider();

    return request.read();
  }

  public readMonthly(query: PaginatedQuery<TransactionMonthlyBalance>): Observable<ApiResponse<TransactionMonthlyBalance[]>> {
    const request = this.requestWithQuery(query);

    request.appendRoute('/monthly');

    return request.read();
  }

}