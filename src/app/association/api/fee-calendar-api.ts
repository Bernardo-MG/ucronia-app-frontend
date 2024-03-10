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
    return this.getRequest().query(query).appendRoute(`/${year}`).read();
  }

  public readCalendarRange(): Observable<ApiResponse<FeeCalendarYearsRange>> {
    return this.getRequest().appendRoute("/range").read();
  }

  private getRequest() {
    return new AngularRequest(this.http, environment.apiUrl + '/fee/calendar');
  }

}