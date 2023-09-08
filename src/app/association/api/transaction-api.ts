import { HttpClient } from "@angular/common/http";
import { Transaction } from "@app/association/models/transaction";
import { TransactionCalendarRange } from "@app/association/models/transaction-calendar-range";
import { ApiResponse } from "@app/core/api/models/api-response";
import { AngularRequest } from "@app/core/api/request/angular-request";
import { CrudApi } from "@app/core/api/crud-api";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

export class TransactionApi extends CrudApi<Transaction> {

  constructor(
    private http: HttpClient
  ) {
    super(() => new AngularRequest(this.http, environment.apiUrl + '/transaction'))
  }

  public calendarMonth(year: number, month: number): Observable<ApiResponse<Transaction[]>> {
    const request = this.requestProvider();

    request.appendRoute(`/calendar/${year}/${month}`);

    return request.read();
  }

  public calendarRange(): Observable<ApiResponse<TransactionCalendarRange>> {
    const request = this.requestProvider();

    request.appendRoute("/calendar/range");

    return request.read();
  }

}