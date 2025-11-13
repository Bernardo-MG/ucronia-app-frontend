import { Injectable, inject } from '@angular/core';
import { PublicMember } from '@app/domain/members/public-member';
import { Active } from '@app/domain/contact/active';
import { AngularCrudClientProvider, PaginatedResponse, PaginationParams, SimpleResponse, Sorting, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicMemberService {

  private readonly client;

  constructor() {
    const clientProvider = inject(AngularCrudClientProvider);

    this.client = clientProvider.url(environment.apiUrl + '/member');
  }

  public getAll(page: number, sort: Sorting): Observable<PaginatedResponse<PublicMember>> {
    const sorting = new SortingParams(
      sort.properties,
      [new SortingProperty('firstName'), new SortingProperty('lastName'), new SortingProperty('number')]
    );

    return this.client
      .loadParameters(new PaginationParams(page))
      .loadParameters(sorting)
      .parameter('status', Active.Active.toString().toUpperCase())
      .read<PaginatedResponse<PublicMember>>();
  }

  public getOne(number: number): Observable<PublicMember> {
    return this.client
      .appendRoute(`/${number}`)
      .read<SimpleResponse<PublicMember>>()
      .pipe(map(r => r.content));
  }

}
