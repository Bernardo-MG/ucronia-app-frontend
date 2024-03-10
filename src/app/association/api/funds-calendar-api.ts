import { HttpClient } from "@angular/common/http";
import { ApiResponse } from "@app/core/api/models/api-response";
import { PaginatedQuery } from "@app/core/api/models/paginated-query";
import { AngularRequest } from "@app/core/api/request/angular-request";
import { Request } from '@app/core/api/request/request';
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { TransactionCalendarMonth } from "../transactions/models/transaction-calendar-month";
import { TransactionCalendarMonthsRange } from "../transactions/models/transaction-calendar-months-range";

export class FundsCalendarApi {

  constructor(
    private http: HttpClient
  ) { }

  public calendarMonth(year: number, month: number): Observable<ApiResponse<TransactionCalendarMonth>> {
    const request = this.getRequest();

    request.appendRoute(`/${year}/${month}`);

    return request.read();
  }

  public calendarRange(): Observable<ApiResponse<TransactionCalendarMonthsRange>> {
    const request = this.getRequest();

    request.appendRoute("/range");

    return request.read();
  }

  private getRequest(): Request {
    return new AngularRequest(this.http, environment.apiUrl + '/funds/calendar');
  }

  protected requestWithQuery(query: PaginatedQuery<any>): Request {
    const request = this.getRequest();

    // Sort
    request.sort(query.sort);

    // Other parameters
    for (const key in query.parameters) {
      const value = query.parameters[key];
      if (value) {
        request.parameter(key, value);
      }
    }

    return request;
  }

}