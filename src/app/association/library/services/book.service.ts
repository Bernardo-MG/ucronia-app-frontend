import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularRequest } from '@app/core/api/request/angular-request';
import { environment } from 'environments/environment';
import { Request } from '@app/core/api/request/request';
import { Active } from '@app/association/members/models/active';
import { Member } from '@app/association/members/models/member';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { Sort } from '@app/core/api/models/sort';
import { Observable } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll(pagination: PaginationRequest | undefined): Observable<PaginatedResponse<Book[]>> {
    const query = new PaginatedQuery<Book>();
    query.defaultSort = [new Sort('title')];
    query.pagination = pagination;

    return this.getRequest().query(query).read();
  }

  private getRequest(): Request {
    return new AngularRequest(this.http, environment.apiUrl + '/library/book');
  }

}
