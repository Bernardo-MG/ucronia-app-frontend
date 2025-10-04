import { Injectable, inject } from '@angular/core';
import { Active } from '@app/domain/person/active';
import { Person } from '@app/domain/person/person';
import { PersonCreation } from '@app/domain/person/person-creation';
import { AngularCrudClientProvider, PaginatedResponse, PaginationParams, SimpleResponse, Sorting, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private readonly client;

  constructor() {
    const clientProvider = inject(AngularCrudClientProvider);

    this.client = clientProvider.url(environment.apiUrl + '/person');
  }

  public getAll(page: number, sort: Sorting, active: Active, name: string): Observable<PaginatedResponse<Person>> {
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
      .read<PaginatedResponse<Person>>();
  }

  public create(data: PersonCreation): Observable<Person> {
    return this.client
      .create<SimpleResponse<Person>>(data)
      .pipe(map(r => r.content));
  }

  public patch(data: Person): Observable<Person> {
    return this.client
      .appendRoute(`/${data.number}`)
      .patch<SimpleResponse<Person>>(data)
      .pipe(map(r => r.content));
  }

  public delete(number: number): Observable<Person> {
    return this.client
      .appendRoute(`/${number}`)
      .delete<SimpleResponse<Person>>()
      .pipe(map(r => r.content));
  }

  public getOne(number: number): Observable<Person> {
    return this.client
      .appendRoute(`/${number}`)
      .read<SimpleResponse<Person>>()
      .pipe(map(r => r.content));
  }

}
