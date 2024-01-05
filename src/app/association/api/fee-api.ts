import { HttpClient } from "@angular/common/http";
import { FeeCalendarRange } from "@app/association/membership/models/fee-calendar-range";
import { FeePayment } from "@app/association/membership/models/fee-payment";
import { ApiResponse } from "@app/core/api/models/api-response";
import { PaginatedQuery } from "@app/core/api/models/paginated-query";
import { AngularRequest } from "@app/core/api/request/angular-request";
import { Request } from "@app/core/api/request/request";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { Fee } from "../membership/models/fee";
import { UserFeeCalendar } from "../membership/models/user-fee-calendar";

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

  public calendarYear(year: number, query: PaginatedQuery<UserFeeCalendar>): Observable<ApiResponse<UserFeeCalendar[]>> {
    const request = this.requestWithQuery(query);

    request.appendRoute(`/calendar/${year}`);

    return request.read();
  }

  public calendarRange(): Observable<ApiResponse<FeeCalendarRange>> {
    const request = this.getRequest();

    request.appendRoute("/calendar/range");

    return request.read();
  }

  private getRequest() {
    return new AngularRequest(this.http, environment.apiUrl + '/fee');
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