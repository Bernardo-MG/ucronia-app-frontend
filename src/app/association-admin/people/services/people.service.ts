import { Injectable } from '@angular/core';
import { Active } from '@app/association/members/model/active';
import { Person } from '@app/models/person/person';
import { AngularCrudClientProvider, CrudClient, PaginatedResponse, PaginationParams, SimpleResponse, Sorting, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private client;

  constructor(
    private clientProvider: AngularCrudClientProvider
  ) { 
    this.client = this.clientProvider.url(environment.apiUrl + '/person');
  }

  public getAll(page: number, sort: Sorting, active: Active): Observable<PaginatedResponse<Person>> {
    const sorting = new SortingParams(
      sort.properties,
      [new SortingProperty('firstName'), new SortingProperty('lastName'), new SortingProperty('number')]
    );

    return this.client
      .loadParameters(new PaginationParams(page))
      .loadParameters(sorting)
      .parameter('status', active.toString().toUpperCase())
      .read<PaginatedResponse<Person>>();
  }

  public create(data: Person): Observable<Person> {
    return this.client
      .create<SimpleResponse<Person>>(data)
      .pipe(map(r => r.content));
  }

  public patch(number: number, data: Person): Observable<Person> {
    return this.client
      .appendRoute(`/${number}`)
      .patch<SimpleResponse<Person>>(data)
      .pipe(map(r => r.content));
  }

  public delete(number: number): Observable<boolean> {
    return this.client
      .appendRoute(`/${number}`)
      .delete<SimpleResponse<boolean>>()
      .pipe(map(r => r.content));
  }

  public getOne(number: number): Observable<Person> {
    return this.client
      .appendRoute(`/${number}`)
      .read<SimpleResponse<Person>>()
      .pipe(map(r => r.content));
  }

}
