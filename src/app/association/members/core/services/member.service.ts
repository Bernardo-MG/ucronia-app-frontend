import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Active } from '@app/association/members/model/active';
import { AngularCrudClient, CrudClient, PaginatedResponse, PaginationParams, SimpleResponse, Sort, SortProperty, SortingParams } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { Member } from '../../../../models/members/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll(page: number, sort: Sort): Observable<PaginatedResponse<Member[]>> {
    const sorting = new SortingParams(
      sort.properties,
      [new SortProperty('firstName'), new SortProperty('lastName'), new SortProperty('number')]
    );

    return this.getClient()
      .loadParameters(new PaginationParams(page))
      .loadParameters(sorting)
      .parameter('status', Active.Active.toString().toUpperCase())
      .read<PaginatedResponse<Member[]>>();
  }

  public getOne(number: number): Observable<Member> {
    return this.getClient()
      .appendRoute(`/${number}`)
      .read<SimpleResponse<Member>>()
      .pipe(map(r => r.content));
  }

  private getClient(): CrudClient {
    return new AngularCrudClient(this.http, environment.apiUrl + '/member');
  }

}
