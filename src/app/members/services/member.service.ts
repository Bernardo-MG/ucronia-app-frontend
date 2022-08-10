import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteDatasource } from '@app/api/datasource/route-datasource';
import { ApiRequest } from '@app/api/models/api-request';
import { ApiResponse } from '@app/api/models/api-response';
import { Sort } from '@app/api/models/sort';
import { GetOperations } from '@app/api/request/get-operations';
import { RequestClient } from '@app/api/request/request-client';
import { Member } from '@app/models/member';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private memberUrl = environment.apiUrl + "/member";

  datasource: RouteDatasource<Member>;

  constructor(
    private client: RequestClient,
    route: ActivatedRoute
  ) {
    this.datasource = new RouteDatasource<Member>(route, (request: ApiRequest<Member>) => this.requestMembers(request));
  }

  public getMembers(): Observable<Member[]> {
    return this.datasource.data;
  }

  private requestMembers(request: ApiRequest<Member>): Observable<ApiResponse<Member[]>> {
    const selectors = [];
    const clt: GetOperations<Member> = this.client.get(this.memberUrl);

    if (request.search) {
      if (request.search.name) {
        clt.parameter("name", request.search.name);
      }

      for (const [key, val] of Object.entries(request.search.selectors)) {
        if (val) {
          selectors.push(key);
        }
      }

      if (selectors.length) {
        clt.parameter("selectors", selectors);
      }
    }

    let sort: Sort<Member>;
    if (request.sort) {
      sort = request.sort;
    } else {
      sort = { property: 'name', order: 'asc' };
    }

    return clt.page(request.pagination).sort(sort).fetch();
  }

}
