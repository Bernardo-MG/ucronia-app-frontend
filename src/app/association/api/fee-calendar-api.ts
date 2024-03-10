import { HttpClient } from "@angular/common/http";
import { FeeCalendarYearsRange } from "@app/association/fees/models/fee-calendar-years-range";
import { ApiResponse } from "@app/core/api/models/api-response";
import { PaginatedQuery } from "@app/core/api/models/paginated-query";
import { AngularRequest } from "@app/core/api/request/angular-request";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { FeeCalendar } from "../fees/models/fee-calendar";

export class FeeCalendarApi {

  constructor(
    private http: HttpClient
  ) { }

  public readCalendarYear(year: number, query: PaginatedQuery<FeeCalendar>): Observable<ApiResponse<FeeCalendar[]>> {
    const request = this.getRequest().query(query);

    request.appendRoute(`/${year}`);

    return request.read();
  }

  public readCalendarRange(): Observable<ApiResponse<FeeCalendarYearsRange>> {
    const request = this.getRequest();

    request.appendRoute("/range");

    return request.read();
  }

  private getRequest() {
    return new AngularRequest(this.http, environment.apiUrl + '/fee/calendar');
  }

}