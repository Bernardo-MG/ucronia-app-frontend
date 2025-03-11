import { Injectable } from '@angular/core';
import { Active } from '@app/association/members/model/active';
import { AngularCrudClientProvider, PaginatedResponse, PaginationParams, SimpleResponse, Sorting, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { Member } from '../../../../models/members/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private readonly client;

  constructor(
    clientProvider: AngularCrudClientProvider
  ) {
    this.client = clientProvider.url(environment.apiUrl + '/member');
  }

  public getAll(page: number, sort: Sorting): Observable<PaginatedResponse<Member>> {
    const sorting = new SortingParams(
      sort.properties,
      [new SortingProperty('firstName'), new SortingProperty('lastName'), new SortingProperty('number')]
    );

    return this.client
      .loadParameters(new PaginationParams(page))
      .loadParameters(sorting)
      .parameter('status', Active.Active.toString().toUpperCase())
      .read<PaginatedResponse<Member>>();
  }

  public getOne(number: number): Observable<Member> {
    return this.client
      .appendRoute(`/${number}`)
      .read<SimpleResponse<Member>>()
      .pipe(map(r => r.content));
  }

}
