import { HttpClient } from "@angular/common/http";
import { ApiResponse } from "@app/core/api/models/api-response";
import { PaginatedQuery } from "@app/core/api/models/paginated-query";
import { PaginatedResponse } from "@app/core/api/models/paginated-response";
import { AngularRequest } from "@app/core/api/request/angular-request";
import { Request } from '@app/core/api/request/request';
import { Role } from "@app/core/authentication/models/role";
import { User } from "@app/core/authentication/models/user";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

export class UserApi {

  constructor(
    private http: HttpClient
  ) { }

  public readRoles(user: string, query: PaginatedQuery<Role>): Observable<PaginatedResponse<Role[]>> {
    const request = this.getRequestWithQuery(query);

    request.appendRoute(`/${user}/role`);

    return request.read();
  }

  public readAvailableRoles(user: string, query: PaginatedQuery<Role>): Observable<PaginatedResponse<Role[]>> {
    const request = this.getRequestWithQuery(query);

    request.appendRoute(`/${user}/role/available`);

    return request.read();
  }

  public updateRoles(user: string, role: string): Observable<ApiResponse<Role>> {
    const request = this.getRequest();

    request.appendRoute(`/${user}/role/${role}`);

    return request.update({});
  }

  public removeRoles(user: string, role: string): Observable<ApiResponse<boolean>> {
    const request = this.getRequest();

    request.appendRoute(`/${user}/role/${role}`);

    return request.delete();
  }

  public readAll(query: PaginatedQuery<User>): Observable<PaginatedResponse<User[]>> {
    const request = this.getRequestWithQuery(query);

    return request.read();
  }

  public readById(id: any): Observable<ApiResponse<User>> {
    const request = this.getRequest();

    request.appendRoute(`/${id}`);
    return request.read();
  }

  public create(data: User): Observable<ApiResponse<User>> {
    const request = this.getRequest();

    return request.create(data);
  }

  public updateById(id: any, data: User): Observable<ApiResponse<User>> {
    const request = this.getRequest();

    request.appendRoute(`/${id}`);

    return request.update(data);
  }

  public deleteById(id: any): Observable<ApiResponse<boolean>> {
    const request = this.getRequest();

    request.appendRoute(`/${id}`);

    return request.delete();
  }

  private getRequest(): Request {
    return new AngularRequest(this.http, environment.apiUrl + '/security/user');
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