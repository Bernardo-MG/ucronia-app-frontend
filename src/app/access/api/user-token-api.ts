import { HttpClient } from "@angular/common/http";
import { ApiResponse } from "@app/core/api/models/api-response";
import { PaginatedQuery } from "@app/core/api/models/paginated-query";
import { PaginatedResponse } from "@app/core/api/models/paginated-response";
import { AngularRequest } from "@app/core/api/request/angular-request";
import { Request } from '@app/core/api/request/request';
import { UserToken } from "@app/core/authentication/models/user-token";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

export class UserTokenApi {

  constructor(
    private http: HttpClient
  ) { }

  public create(data: UserToken): Observable<ApiResponse<UserToken>> {
    const request = this.getRequest();

    return request.create(data);
  }

  public update(data: UserToken): Observable<ApiResponse<UserToken>> {
    const request = this.getRequest();

    return request.update(data);
  }

  public updateById(id: any, data: UserToken): Observable<ApiResponse<UserToken>> {
    const request = this.getRequest();

    request.appendRoute(`/${id}`);

    return request.update(data);
  }

  public delete(): Observable<ApiResponse<boolean>> {
    const request = this.getRequest();

    return request.delete();
  }

  public deleteById(id: any): Observable<ApiResponse<boolean>> {
    const request = this.getRequest();

    request.appendRoute(`/${id}`);

    return request.delete();
  }

  public patch(data: UserToken): Observable<ApiResponse<UserToken>> {
    const request = this.getRequest();

    return request.patch(data);
  }

  public patchById<P>(id: any, data: P): Observable<ApiResponse<UserToken>> {
    const request = this.getRequest();

    request.appendRoute(`/${id}`);

    return request.patch(data);
  }

  public readAll(query: PaginatedQuery<UserToken>): Observable<PaginatedResponse<UserToken[]>> {
    const request = this.getRequestWithQuery(query);

    return request.read();
  }

  public readOne(): Observable<ApiResponse<UserToken>> {
    const request = this.getRequest();

    return request.read();
  }

  public readById(id: any): Observable<ApiResponse<UserToken>> {
    const request = this.getRequest();

    request.appendRoute(`/${id}`);
    return request.read();
  }

  private getRequest(): Request {
    return new AngularRequest(this.http, environment.apiUrl + '/security/user/token');
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