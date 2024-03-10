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
    return this.getRequest().create(data);
  }

  public update(data: UserToken): Observable<ApiResponse<UserToken>> {
    return this.getRequest().update(data);
  }

  public updateById(id: any, data: UserToken): Observable<ApiResponse<UserToken>> {
    return this.getRequest().appendRoute(`/${id}`).update(data);
  }

  public delete(): Observable<ApiResponse<boolean>> {
    return this.getRequest().delete();
  }

  public deleteById(id: any): Observable<ApiResponse<boolean>> {
    return this.getRequest().appendRoute(`/${id}`).delete();
  }

  public patch(data: UserToken): Observable<ApiResponse<UserToken>> {
    return this.getRequest().patch(data);
  }

  public patchById<P>(id: any, data: P): Observable<ApiResponse<UserToken>> {
    return this.getRequest().appendRoute(`/${id}`).patch(data);
  }

  public readAll(query: PaginatedQuery<UserToken>): Observable<PaginatedResponse<UserToken[]>> {
    return this.getRequest().query(query).read();
  }

  public readOne(): Observable<ApiResponse<UserToken>> {
    return this.getRequest().read();
  }

  public readById(id: any): Observable<ApiResponse<UserToken>> {
    return this.getRequest().appendRoute(`/${id}`).read();
  }

  private getRequest(): Request {
    return new AngularRequest(this.http, environment.apiUrl + '/security/user/token');
  }

}