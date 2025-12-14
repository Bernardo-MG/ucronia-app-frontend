import { Injectable, inject } from '@angular/core';
import { MemberContact } from '@app/association/members/domain/member-contact';
import { MemberStatus } from '@app/domain/contact/active';
import { AngularCrudClientProvider, PaginatedResponse, PaginationParams, SimpleResponse, Sorting, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberContactsService {

  private readonly client;
  private readonly contactClient;

  constructor() {
    const clientProvider = inject(AngularCrudClientProvider);

    this.client = clientProvider.url(environment.apiUrl + '/member');
    this.contactClient = clientProvider.url(environment.apiUrl + '/contact');
  }

  public getAll(page: number, sort: Sorting, active: MemberStatus, name: string): Observable<PaginatedResponse<MemberContact>> {
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
      .read<PaginatedResponse<MemberContact>>();
  }

  public getOne(number: number): Observable<MemberContact> {
    return forkJoin({
      member: this.getMember(number),
      contact: this.getContact(number)
    }).pipe(
      map(({ member, contact }) => ({
        ...contact,
        ...member
      }))
    );
  }

  private getMember(number: number): Observable<MemberContact> {
    return this.client
      .appendRoute(`/${number}`)
      .read<SimpleResponse<MemberContact>>()
      .pipe(map(r => r.content));
  }

  private getContact(number: number): Observable<MemberContact> {
    return this.contactClient
      .appendRoute(`/${number}`)
      .read<SimpleResponse<MemberContact>>()
      .pipe(map(r => r.content));
  }

}
