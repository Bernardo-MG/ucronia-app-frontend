import { HttpClient } from "@angular/common/http";
import { ApiResponse } from "@app/core/api/models/api-response";
import { AngularRequest } from "@app/core/api/request/angular-request";
import { Request } from '@app/core/api/request/request';
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { TransactionCalendarMonth } from "../transactions/models/transaction-calendar-month";
import { TransactionCalendarMonthsRange } from "../transactions/models/transaction-calendar-months-range";

export class TransactionCalendarApi {

  constructor(
    private http: HttpClient
  ) { }

  public readCalendarMonth(year: number, month: number): Observable<ApiResponse<TransactionCalendarMonth>> {
    const request = this.getRequest();

    request.appendRoute(`/${year}/${month}`);

    return request.read();
  }

  public readCalendarRange(): Observable<ApiResponse<TransactionCalendarMonthsRange>> {
    const request = this.getRequest();

    request.appendRoute("/range");

    return request.read();
  }

  private getRequest(): Request {
    return new AngularRequest(this.http, environment.apiUrl + '/funds/calendar');
  }

}