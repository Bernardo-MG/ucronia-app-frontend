import { HttpClient } from "@angular/common/http";
import { CrudApi } from "@app/core/api/crud-api";
import { ApiResponse } from "@app/core/api/models/api-response";
import { PaginatedQuery } from "@app/core/api/models/paginated-query";
import { PaginatedResponse } from "@app/core/api/models/paginated-response";
import { AngularRequest } from "@app/core/api/request/angular-request";
import { Role } from "@app/core/authentication/models/role";
import { User } from "@app/core/authentication/models/user";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

export class UserApi extends CrudApi<User> {

  constructor(
    private http: HttpClient
  ) {
    super(() => new AngularRequest(this.http, environment.apiUrl + '/security/user'))
  }

  public readRoles(user: string, query: PaginatedQuery<Role>): Observable<PaginatedResponse<Role[]>> {
    const request = this.requestWithQuery(query);

    request.appendRoute(`/${user}/role`);

    return request.read();
  }

  public readAvailableRoles(user: string, query: PaginatedQuery<Role>): Observable<PaginatedResponse<Role[]>> {
    const request = this.requestWithQuery(query);

    request.appendRoute(`/${user}/role/available`);

    return request.read();
  }

  public updateRoles(user: string, role: string): Observable<ApiResponse<Role>> {
    const request = this.requestProvider();

    request.appendRoute(`/${user}/role/${role}`);

    return request.update({});
  }

  public removeRoles(user: string, role: string): Observable<ApiResponse<boolean>> {
    const request = this.requestProvider();

    request.appendRoute(`/${user}/role/${role}`);

    return request.delete();
  }

}