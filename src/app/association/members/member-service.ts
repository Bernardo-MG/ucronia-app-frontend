import { Injectable, inject } from '@angular/core';
import { AngularCrudClientProvider, PaginatedResponse, PaginationParams, Sorting, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { Member, MemberStatus } from "@ucronia/domain";
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private readonly client;

  constructor() {
    const clientProvider = inject(AngularCrudClientProvider);

    this.client = clientProvider.url(environment.apiUrl + '/member');
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

}
