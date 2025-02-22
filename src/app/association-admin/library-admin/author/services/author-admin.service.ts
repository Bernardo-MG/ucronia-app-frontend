import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from '@app/models/library/author';
import { AngularCrudClient, CrudClient, PaginatedResponse, PaginationParams, SimpleResponse, Sort, SortProperty, SortingParams } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class AuthorAdminService {

  constructor(
    private http: HttpClient
  ) { }

  public create(data: Author): Observable<Author> {
    return this.getClient()
      .create<SimpleResponse<Author>>(data)
      .pipe(map(r => r.content));
  }

  public update(number: number, data: Author): Observable<Author> {
    return this.getClient()
      .appendRoute(`/${number}`)
      .update<SimpleResponse<Author>>(data)
      .pipe(map(r => r.content));
  }

  public getOne(number: number): Observable<Author> {
    return this.getClient()
      .appendRoute(`/${number}`)
      .read<SimpleResponse<Author>>()
      .pipe(map(r => r.content));
  }

  public delete(number: number): Observable<boolean> {
    return this.getClient()
      .appendRoute(`/${number}`)
      .delete<SimpleResponse<boolean>>()
      .pipe(map(r => r.content));
  }

  public getAll(page: number, sort: Sort): Observable<PaginatedResponse<Author[]>> {
    const sorting = new SortingParams(
      sort.properties,
      [new SortProperty('name'), new SortProperty('number')]
    );

    return this.getClient()
      .loadParameters(new PaginationParams(page))
      .loadParameters(sorting)
      .read();
  }

  private getClient(): CrudClient {
    return new AngularCrudClient(this.http, environment.apiUrl + '/library/author');
  }

}
