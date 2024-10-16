import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { Sort } from '@app/core/api/models/sort';
import { SortProperty } from '@app/core/api/models/sort-field';
import { Person } from '@app/models/person/person';
import { Active } from '@app/models/members/active';
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
    const query = new PaginatedQuery();
    query.defaultSort = new Sort([new SortProperty('fullName'), new SortProperty('number')]);
    query.pagination = { page };
    query.sort = sort;
    query.addParameter('status', active.toString().toUpperCase());

    return this.getClient()
      .query(query)
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
