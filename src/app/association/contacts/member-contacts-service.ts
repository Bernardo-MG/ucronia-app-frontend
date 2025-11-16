import { Injectable, inject } from '@angular/core';
import { Active } from '@app/domain/contact/active';
import { ContactCreation } from '@app/domain/contact/contact-creation';
import { MemberContact } from '@app/domain/contact/member-contact';
import { AngularCrudClientProvider, PaginatedResponse, PaginationParams, SimpleResponse, Sorting, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberContacsService {

  private readonly client;

  constructor() {
    const clientProvider = inject(AngularCrudClientProvider);

    this.client = clientProvider.url(environment.apiUrl + '/contact/member');
  }

  public getAll(page: number, sort: Sorting, active: Active, name: string): Observable<PaginatedResponse<MemberContact>> {
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

  public create(data: ContactCreation): Observable<MemberContact> {
    return this.client
      .create<SimpleResponse<MemberContact>>(data)
      .pipe(map(r => r.content));
  }

  public patch(data: MemberContact): Observable<MemberContact> {
    return this.client
      .appendRoute(`/${data.number}`)
      .patch<SimpleResponse<MemberContact>>(data)
      .pipe(map(r => r.content));
  }

  public delete(number: number): Observable<MemberContact> {
    return this.client
      .appendRoute(`/${number}`)
      .delete<SimpleResponse<MemberContact>>()
      .pipe(map(r => r.content));
  }

  public getOne(number: number): Observable<MemberContact> {
    return this.client
      .appendRoute(`/${number}`)
      .read<SimpleResponse<MemberContact>>()
      .pipe(map(r => r.content));
  }

}
