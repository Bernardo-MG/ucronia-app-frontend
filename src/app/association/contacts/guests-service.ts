import { inject, Injectable } from '@angular/core';
import { AngularCrudClientProvider, PaginatedResponse, PaginationParams, SimpleResponse, Sorting, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { Guest, MemberStatus } from '@ucronia/domain';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GuestsService {

  private readonly client;

  constructor() {
    const clientProvider = inject(AngularCrudClientProvider);

    this.client = clientProvider.url(environment.apiUrl + '/contact/guest');
  }

  public getAll(page: number | undefined = undefined, sort: Sorting, active: MemberStatus, name: string): Observable<PaginatedResponse<Guest>> {
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
      .read<PaginatedResponse<Guest>>();
  }

  public getOne(number: number): Observable<Guest> {
    return this.client
      .appendRoute(`/${number}`)
      .read<SimpleResponse<Guest>>()
      .pipe(map(r => r.content));
  }

}
