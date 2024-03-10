import { HttpClient } from "@angular/common/http";
import { ApiResponse } from "@app/core/api/models/api-response";
import { PaginatedQuery } from "@app/core/api/models/paginated-query";
import { PaginatedResponse } from "@app/core/api/models/paginated-response";
import { AngularRequest } from "@app/core/api/request/angular-request";
import { Request } from '@app/core/api/request/request';
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { Member } from "../members/models/member";
import { MemberBalance } from "../members/models/member-balance";

export class MemberApi {

  constructor(
    private http: HttpClient
  ) { }

  public readMonthly(query: PaginatedQuery<MemberBalance>): Observable<ApiResponse<MemberBalance[]>> {
    const request = this.getRequestWithQuery(query);

    request.appendRoute('/monthly');

    return request.read();
  }

  public create(data: Member): Observable<ApiResponse<Member>> {
    const request = this.getRequest();

    return request.create(data);
  }

  public updateById(id: any, data: Member): Observable<ApiResponse<Member>> {
    const request = this.getRequest();

    request.appendRoute(`/${id}`);

    return request.update(data);
  }

  public deleteById(id: any): Observable<ApiResponse<boolean>> {
    const request = this.getRequest();

    request.appendRoute(`/${id}`);

    return request.delete();
  }

  public readAll(query: PaginatedQuery<Member>): Observable<PaginatedResponse<Member[]>> {
    const request = this.getRequestWithQuery(query);

    return request.read();
  }

  public readById(id: any): Observable<ApiResponse<Member>> {
    const request = this.getRequest();

    request.appendRoute(`/${id}`);
    return request.read();
  }

  private getRequest(): Request {
    return new AngularRequest(this.http, environment.apiUrl + '/member');
  }

  protected getRequestWithQuery(query: PaginatedQuery<any>): Request {
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