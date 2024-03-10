import { HttpClient } from "@angular/common/http";
import { ApiResponse } from "@app/core/api/models/api-response";
import { PaginatedQuery } from "@app/core/api/models/paginated-query";
import { Request } from '@app/core/api/request/request';
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { AngularRequest } from "../../core/api/request/angular-request";
import { TransactionCurrentBalance } from "../transactions/models/transaction-current-balance";
import { TransactionMonthlyBalance } from "../transactions/models/transaction-monthly-balance";

export class BalanceApi {

  constructor(
    private http: HttpClient
  ) { }

  public current(): Observable<ApiResponse<TransactionCurrentBalance>> {
    const request = this.getRequest();

    return request.read();
  }

  public readMonthly(query: PaginatedQuery<TransactionMonthlyBalance>): Observable<ApiResponse<TransactionMonthlyBalance[]>> {
    const request = this.getRequest().query(query);

    request.appendRoute('/monthly');

    return request.read();
  }

  private getRequest(): Request {
    return new AngularRequest(this.http, environment.apiUrl + '/funds/balance');
  }

}