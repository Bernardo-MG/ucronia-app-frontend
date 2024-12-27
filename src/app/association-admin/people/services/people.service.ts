import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Active } from '@app/association/members/model/active';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { PaginationParams } from '@app/core/api/models/pagination-params';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { Sort } from '@app/core/api/models/sort';
import { SortProperty } from '@app/core/api/models/sort-field';
import { SortingParams } from '@app/core/api/models/sorting-params';
import { Person } from '@app/models/person/person';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll(page: number, sort: Sort, active: Active): Observable<PaginatedResponse<Person[]>> {
    const sorting = new SortingParams(
      sort.properties,
      [new SortProperty('firstName'), new SortProperty('lastName'), new SortProperty('number')]
    );

    return this.getClient()
      .parameters(new PaginationParams(page))
      .parameters(sorting)
      .parameter('status', active.toString().toUpperCase())
      .read<PaginatedResponse<Person[]>>();
  }

  public create(data: Person): Observable<Person> {
    return this.getClient()
      .create<SimpleResponse<Person>>(data)
      .pipe(map(r => r.content));
  }

  public patch(number: number, data: Person): Observable<Person> {
    return this.getClient()
      .appendRoute(`/${number}`)
      .patch<SimpleResponse<Person>>(data)
      .pipe(map(r => r.content));
  }

  public delete(number: number): Observable<boolean> {
    return this.getClient()
      .appendRoute(`/${number}`)
      .delete<SimpleResponse<boolean>>()
      .pipe(map(r => r.content));
  }

  public getOne(number: number): Observable<Person> {
    return this.getClient()
      .appendRoute(`/${number}`)
      .read<SimpleResponse<Person>>()
      .pipe(map(r => r.content));
  }

  private getClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/person');
  }

}
