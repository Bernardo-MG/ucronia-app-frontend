import { HttpClient } from "@angular/common/http";
import { ApiResponse } from "@app/core/api/models/api-response";
import { Request } from "@app/core/api/request/request";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { AngularRequest } from "../../core/api/request/angular-request";
import { Balance } from "../funds/models/balance";
import { MonthlyBalance } from "../funds/models/monthly-balance";

export class BalanceApi {

  private requestProvider: () => Request;

  constructor(
    private http: HttpClient
  ) {
    this.requestProvider = () => new AngularRequest(this.http, environment.apiUrl + '/balance');
  }

  public read(): Observable<ApiResponse<Balance[]>> {
    const request = this.requestProvider();

    return request.read();
  }

  public readMonthly(): Observable<ApiResponse<MonthlyBalance[]>> {
    const request = this.requestProvider();

    request.appendRoute('/monthly');

    return request.read();
  }

}