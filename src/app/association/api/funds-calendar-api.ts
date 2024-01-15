import { HttpClient } from "@angular/common/http";
import { CrudApi } from "@app/core/api/crud-api";
import { ApiResponse } from "@app/core/api/models/api-response";
import { AngularRequest } from "@app/core/api/request/angular-request";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { Transaction } from "../transactions/models/transaction";
import { TransactionCalendarMonth } from "../transactions/models/transaction-calendar-month";
import { TransactionCalendarRange } from "../transactions/models/transaction-calendar-range";

export class FundsCalendarApi extends CrudApi<Transaction> {

  constructor(
    private http: HttpClient
  ) {
    super(() => new AngularRequest(this.http, environment.apiUrl + '/funds/calendar'))
  }

  public calendarMonth(year: number, month: number): Observable<ApiResponse<TransactionCalendarMonth>> {
    const request = this.requestProvider();

    request.appendRoute(`/${year}/${month}`);

    return request.read();
  }

  public calendarRange(): Observable<ApiResponse<TransactionCalendarRange>> {
    const request = this.requestProvider();

    request.appendRoute("/range");

    return request.read();
  }

}