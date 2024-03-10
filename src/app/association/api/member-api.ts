import { HttpClient } from "@angular/common/http";
import { ApiResponse } from "@app/core/api/models/api-response";
import { PaginatedQuery } from "@app/core/api/models/paginated-query";
import { PaginatedResponse } from "@app/core/api/models/paginated-response";
import { AngularRequest } from "@app/core/api/request/angular-request";
import { Request } from '@app/core/api/request/request';
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { Member } from "../members/models/member";

export class MemberApi {

  constructor(
    private http: HttpClient
  ) { }

  public create(data: Member): Observable<ApiResponse<Member>> {
    return this.getRequest().create(data);
  }

  public updateById(id: any, data: Member): Observable<ApiResponse<Member>> {
    return this.getRequest().appendRoute(`/${id}`).update(data);
  }

  public deleteById(id: any): Observable<ApiResponse<boolean>> {
    return this.getRequest().appendRoute(`/${id}`).delete();
  }

  public readAll(query: PaginatedQuery<Member>): Observable<PaginatedResponse<Member[]>> {
    return this.getRequest().query(query).read();
  }

  public readById(id: any): Observable<ApiResponse<Member>> {
    return this.getRequest().appendRoute(`/${id}`).read();
  }

  private getRequest(): Request {
    return new AngularRequest(this.http, environment.apiUrl + '/member');
  }

}