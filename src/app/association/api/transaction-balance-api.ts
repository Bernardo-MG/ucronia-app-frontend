import { HttpClient } from "@angular/common/http";
import { ApiResponse } from "@app/core/api/models/api-response";
import { PaginatedQuery } from "@app/core/api/models/paginated-query";
import { Request } from '@app/core/api/request/request';
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { AngularRequest } from "../../core/api/request/angular-request";
import { TransactionCurrentBalance } from "../transactions/models/transaction-current-balance";
import { TransactionMonthlyBalance } from "../transactions/models/transaction-monthly-balance";

export class TransactionBalanceApi {

  constructor(
    private http: HttpClient
  ) { }

  public readCurrent(): Observable<ApiResponse<TransactionCurrentBalance>> {
    return this.getRequest().read();
  }

  public readMonthly(query: PaginatedQuery<TransactionMonthlyBalance>): Observable<ApiResponse<TransactionMonthlyBalance[]>> {
    return this.getRequest().query(query).appendRoute('/monthly').read();
  }

  private getRequest(): Request {
    return new AngularRequest(this.http, environment.apiUrl + '/funds/balance');
  }

}