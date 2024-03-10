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

  public readAll(query: PaginatedQuery<User>): Observable<PaginatedResponse<User[]>> {
    return this.getRequest().query(query).read();
  }

  public readById(id: any): Observable<ApiResponse<User>> {
    return this.getRequest().appendRoute(`/${id}`).read();
  }

  public create(data: User): Observable<ApiResponse<User>> {
    return this.getRequest().create(data);
  }

  public updateById(id: any, data: User): Observable<ApiResponse<User>> {
    return this.getRequest().appendRoute(`/${id}`).update(data);
  }

  public deleteById(id: any): Observable<ApiResponse<boolean>> {
    return this.getRequest().appendRoute(`/${id}`).delete();
  }

  public readRoles(user: string, query: PaginatedQuery<Role>): Observable<PaginatedResponse<Role[]>> {
    return this.getRequest().query(query).appendRoute(`/${user}/role`).read();
  }

  public readAvailableRoles(user: string, query: PaginatedQuery<Role>): Observable<PaginatedResponse<Role[]>> {
    return this.getRequest().query(query).appendRoute(`/${user}/role/available`).read();
  }

  public updateRoles(user: string, role: string): Observable<ApiResponse<Role>> {
    return this.getRequest().appendRoute(`/${user}/role/${role}`).update({});
  }

  public removeRoles(user: string, role: string): Observable<ApiResponse<boolean>> {
    return this.getRequest().appendRoute(`/${user}/role/${role}`).delete();
  }

  private getRequest(): Request {
    return new AngularRequest(this.http, environment.apiUrl + '/security/user');
  }

}