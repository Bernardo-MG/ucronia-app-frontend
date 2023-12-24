import { HttpClient } from "@angular/common/http";
import { CrudApi } from "@app/core/api/crud-api";
import { ApiResponse } from "@app/core/api/models/api-response";
import { PaginatedQuery } from "@app/core/api/models/paginated-query";
import { PaginatedResponse } from "@app/core/api/models/paginated-response";
import { AngularRequest } from "@app/core/api/request/angular-request";
import { Permission } from "@app/core/authentication/models/permission";
import { Role } from "@app/core/authentication/models/role";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

export class RoleApi extends CrudApi<Role> {

  constructor(
    private http: HttpClient
  ) {
    super(() => new AngularRequest(this.http, environment.apiUrl + '/security/role'))
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
    const request = this.requestProvider();

    request.appendRoute(`/${role}/permission/${permission}`);

    return request.update({});
  }

  public removePermission(role: string, permission: string): Observable<ApiResponse<boolean>> {
    const request = this.requestProvider();

    request.appendRoute(`/${role}/permission/${permission}`);

    return request.delete();
  }

}