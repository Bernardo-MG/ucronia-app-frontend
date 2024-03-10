import { HttpClient } from "@angular/common/http";
import { ApiResponse } from "@app/core/api/models/api-response";
import { PaginatedQuery } from "@app/core/api/models/paginated-query";
import { PaginatedResponse } from "@app/core/api/models/paginated-response";
import { AngularRequest } from "@app/core/api/request/angular-request";
import { Request } from '@app/core/api/request/request';
import { Permission } from "@app/core/authentication/models/permission";
import { Role } from "@app/core/authentication/models/role";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

export class RoleApi {

  constructor(
    private http: HttpClient
  ) { }

  public create(data: Role): Observable<ApiResponse<Role>> {
    const request = this.getRequest();

    return request.create(data);
  }

  public updateById(id: any, data: Role): Observable<ApiResponse<Role>> {
    const request = this.getRequest();

    request.appendRoute(`/${id}`);

    return request.update(data);
  }

  public deleteById(id: any): Observable<ApiResponse<boolean>> {
    const request = this.getRequest();

    request.appendRoute(`/${id}`);

    return request.delete();
  }

  public readAll(query: PaginatedQuery<Role>): Observable<PaginatedResponse<Role[]>> {
    const request = this.requestWithQuery(query);

    return request.read();
  }

  public readById(id: any): Observable<ApiResponse<Role>> {
    const request = this.getRequest();

    request.appendRoute(`/${id}`);
    return request.read();
  }

  public readPermissions(role: string, query: PaginatedQuery<Permission>): Observable<PaginatedResponse<Permission[]>> {
    const request = this.requestWithQuery(query);

    request.appendRoute(`/${role}/permission`);

    return request.read();
  }

  public readAvailablePermissions(role: string, query: PaginatedQuery<Permission>): Observable<PaginatedResponse<Permission[]>> {
    const request = this.requestWithQuery(query);

    request.appendRoute(`/${role}/permission/available`);

    return request.read();
  }

  public updatePermission(role: string, permission: string): Observable<ApiResponse<Permission>> {
    const request = this.getRequest();

    request.appendRoute(`/${role}/permission/${permission}`);

    return request.update({});
  }

  public removePermission(role: string, permission: string): Observable<ApiResponse<boolean>> {
    const request = this.getRequest();

    request.appendRoute(`/${role}/permission/${permission}`);

    return request.delete();
  }

  private getRequest(): Request {
    return new AngularRequest(this.http, environment.apiUrl + '/security/role');
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