import { HttpClient } from "@angular/common/http";
import { FeeCalendarRange } from "@app/association/membership/models/fee-calendar-range";
import { FeePayment } from "@app/association/membership/models/fee-payment";
import { CrudApi } from "@app/core/api/crud-api";
import { ApiResponse } from "@app/core/api/models/api-response";
import { PaginatedQuery } from "@app/core/api/models/paginated-query";
import { AngularRequest } from "@app/core/api/request/angular-request";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { Fee } from "../membership/models/fee";
import { UserFeeCalendar } from "../membership/models/user-fee-calendar";

export class FeeApi extends CrudApi<Fee> {

  constructor(
    private http: HttpClient
  ) {
    super(() => new AngularRequest(this.http, environment.apiUrl + '/fee'))
  }

  public pay(data: FeePayment): Observable<ApiResponse<FeePayment>> {
    const request = this.requestProvider();

    return request.create(data);
  }

  public calendarYear(year: number, query: PaginatedQuery<UserFeeCalendar>): Observable<ApiResponse<UserFeeCalendar[]>> {
    const request = this.requestWithQuery(query);

    request.appendRoute(`/calendar/${year}`);

    return request.read();
  }

  public calendarRange(): Observable<ApiResponse<FeeCalendarRange>> {
    const request = this.requestProvider();

    request.appendRoute("/calendar/range");

    return request.read();
  }

}