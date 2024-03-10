import { HttpClient } from "@angular/common/http";
import { FeeCalendarYearsRange } from "@app/association/fees/models/fee-calendar-years-range";
import { FeePayment } from "@app/association/fees/models/fee-payment";
import { ApiResponse } from "@app/core/api/models/api-response";
import { PaginatedQuery } from "@app/core/api/models/paginated-query";
import { AngularRequest } from "@app/core/api/request/angular-request";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { Fee } from "../fees/models/fee";
import { FeeCalendar } from "../fees/models/fee-calendar";

export class FeeApi {

  constructor(
    private http: HttpClient
  ) { }

  public pay(data: FeePayment): Observable<ApiResponse<FeePayment>> {
    const request = this.getRequest();

    return request.create(data);
  }

  public updateById(date: string, memberNumber: number, data: Fee): Observable<ApiResponse<Fee>> {
    const request = this.getRequest();

    request.appendRoute(`/${date}/${memberNumber}`);

    return request.update(data);
  }

  public deleteById(date: string, memberNumber: number): Observable<ApiResponse<boolean>> {
    const request = this.getRequest();

    request.appendRoute(`/${date}/${memberNumber}`);

    return request.delete();
  }

  public readById(date: string, memberNumber: number): Observable<ApiResponse<Fee>> {
    const request = this.getRequest();

    request.appendRoute(`/${date}/${memberNumber}`);
    return request.read();
  }

  public calendarYear(year: number, query: PaginatedQuery<FeeCalendar>): Observable<ApiResponse<FeeCalendar[]>> {
    const request = this.getRequest().query(query);

    request.appendRoute(`/calendar/${year}`);

    return request.read();
  }

  public calendarRange(): Observable<ApiResponse<FeeCalendarYearsRange>> {
    const request = this.getRequest();

    request.appendRoute("/calendar/range");

    return request.read();
  }

  private getRequest() {
    return new AngularRequest(this.http, environment.apiUrl + '/fee');
  }

}