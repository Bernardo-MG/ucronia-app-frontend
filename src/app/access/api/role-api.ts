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
    return this.getRequest().create(data);
  }

  public updateById(id: any, data: Role): Observable<ApiResponse<Role>> {
    return this.getRequest().appendRoute(`/${id}`).update(data);
  }

  public deleteById(id: any): Observable<ApiResponse<boolean>> {
    return this.getRequest().appendRoute(`/${id}`).delete();
  }

  public readAll(query: PaginatedQuery<Role>): Observable<PaginatedResponse<Role[]>> {
    return this.getRequest().query(query).read();
  }

  public readById(id: any): Observable<ApiResponse<Role>> {
    return this.getRequest().appendRoute(`/${id}`).read();
  }

  public readPermissions(role: string, query: PaginatedQuery<Permission>): Observable<PaginatedResponse<Permission[]>> {
    return this.getRequest().query(query).appendRoute(`/${role}/permission`).read();
  }

  public readAvailablePermissions(role: string, query: PaginatedQuery<Permission>): Observable<PaginatedResponse<Permission[]>> {
    return this.getRequest().query(query).appendRoute(`/${role}/permission/available`).read();
  }

  public updatePermission(role: string, permission: string): Observable<ApiResponse<Permission>> {
    return this.getRequest().appendRoute(`/${role}/permission/${permission}`).update({});
  }

  public removePermission(role: string, permission: string): Observable<ApiResponse<boolean>> {
    return this.getRequest().appendRoute(`/${role}/permission/${permission}`).delete();
  }

  private getRequest(): Request {
    return new AngularRequest(this.http, environment.apiUrl + '/security/role');
  }

}