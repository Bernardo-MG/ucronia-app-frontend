import { Injectable, inject } from '@angular/core';
import { MemberStatus } from '@app/domain/contact/active';
import { MemberContact } from '@app/domain/contact/member-contact';
import { Member } from '@app/domain/members/member';
import { AngularCrudClientProvider, PaginatedResponse, PaginationParams, SimpleResponse, Sorting, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { MemberCreation } from './domain/member-creation';
import { MemberPatch } from './domain/member-patch';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private readonly client;
  private readonly contactClient;

  constructor() {
    const clientProvider = inject(AngularCrudClientProvider);

    this.client = clientProvider.url(environment.apiUrl + '/member');
    this.contactClient = clientProvider.url(environment.apiUrl + '/contact');
  }

  public getAll(page: number, sort: Sorting, active: MemberStatus, name: string): Observable<PaginatedResponse<Member>> {
    const sorting = new SortingParams(
      sort.properties,
      [new SortingProperty('firstName'), new SortingProperty('lastName'), new SortingProperty('number')]
    );

    let status;
    if (active) {
      status = active.toString().toUpperCase();
    } else {
      status = '';
    }
    return this.client
      .loadParameters(new PaginationParams(page))
      .loadParameters(sorting)
      .parameter('status', status)
      .parameter('name', name)
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

  public create(data: MemberCreation): Observable<Member> {
    return this.client
      .create<SimpleResponse<Member>>(data)
      .pipe(map(r => r.content));
  }

  public delete(number: number): Observable<Member> {
    return this.client
      .appendRoute(`/${number}`)
      .delete<SimpleResponse<Member>>()
      .pipe(map(r => r.content));
  }

  public patch(data: MemberPatch): Observable<Member> {
    return this.client
      .appendRoute(`/${data.number}`)
      .patch<SimpleResponse<Member>>(data)
      .pipe(map(r => r.content));
  }

}
