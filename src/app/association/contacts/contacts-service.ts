import { Injectable, inject } from '@angular/core';
import { AngularCrudClientProvider, PaginatedResponse, PaginationParams, SimpleResponse, Sorting, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { ContactCreation } from '@ucronia/api';
import { Contact, MemberStatus } from "@ucronia/domain";
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private readonly client;

  constructor() {
    const clientProvider = inject(AngularCrudClientProvider);

    this.client = clientProvider.url(environment.apiUrl + '/contact');
  }

  public getAll(page: number, sort: Sorting, active: MemberStatus, name: string): Observable<PaginatedResponse<Contact>> {
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
      .read<PaginatedResponse<Contact>>();
  }

  public create(data: ContactCreation): Observable<Contact> {
    return this.client
      .create<SimpleResponse<Contact>>(data)
      .pipe(map(r => r.content));
  }

  public patch(data: Contact): Observable<Contact> {
    return this.client
      .appendRoute(`/${data.number}`)
      .patch<SimpleResponse<Contact>>(data)
      .pipe(map(r => r.content));
  }

  public delete(number: number): Observable<Contact> {
    return this.client
      .appendRoute(`/${number}`)
      .delete<SimpleResponse<Contact>>()
      .pipe(map(r => r.content));
  }

  public getOne(number: number): Observable<Contact> {
    return this.client
      .appendRoute(`/${number}`)
      .read<SimpleResponse<Contact>>()
      .pipe(map(r => r.content));
  }

}
