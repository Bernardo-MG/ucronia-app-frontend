import { HttpClient } from "@angular/common/http";
import { FeePayment } from "@app/association/fees/models/fee-payment";
import { Fee } from "@app/association/models/fee";
import { FeeCalendarRange } from "@app/association/models/fee-calendar-range";
import { UserFeeCalendar } from "@app/association/models/user-fee-calendar";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/api-response";
import { PaginatedQuery } from "../models/paginated-query";
import { AngularRequest } from "../repository/angular-request";
import { CrudApi } from "../repository/crud-api";

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
    const request = this.requestProvider();

    request.appendRoute(`/calendar/${year}`);

    this.applyQuery(request, query);

    return request.read();
  }

  public calendarRange(): Observable<ApiResponse<FeeCalendarRange>> {
    const request = this.requestProvider();

    request.appendRoute("/calendar/range");

    return request.read();
  }

}