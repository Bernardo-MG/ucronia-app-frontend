import { Injectable, inject } from '@angular/core';
import { Active } from '@app/domain/contact/active';
import { MemberContact } from '@app/domain/contact/member-contact';
import { Member } from '@app/domain/members/member';
import { AngularCrudClientProvider, PaginatedResponse, PaginationParams, SimpleResponse, Sorting, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private readonly client;
  private readonly contactClient;

  constructor() {
    const clientProvider = inject(AngularCrudClientProvider);

    this.client = clientProvider.url(environment.apiUrl + '/member');
    this.contactClient = clientProvider.url(environment.apiUrl + '/contact/member');
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

  public getContact(number: number): Observable<MemberContact> {
    return this.contactClient
      .appendRoute(`/${number}`)
      .read<SimpleResponse<MemberContact>>()
      .pipe(map(r => r.content));
  }

}
