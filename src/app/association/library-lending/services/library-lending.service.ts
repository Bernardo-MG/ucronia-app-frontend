import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '@app/association/library/models/book';
import { Member } from '@app/association/members/models/member';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { SortProperty } from '@app/core/api/models/sort-field';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibraryLendingService {

  constructor(
    private http: HttpClient
  ) { }

  public getBooks(page: number): Observable<PaginatedResponse<Book[]>> {
    const query = new PaginatedQuery();
    query.defaultSort = new Sort([new SortProperty('title')]);
    query.pagination = { page };

    return this.getBookClient().query(query).read();
  }

  public getMembers(page: number): Observable<PaginatedResponse<Member[]>> {
    const query = new PaginatedQuery();
    query.defaultSort = new Sort([new SortProperty('fullName'), new SortProperty('number')]);
    query.pagination = { page };

    return this.getMemberClient()
      .query(query)
      .read<PaginatedResponse<Member[]>>();
  }

  private getBookClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/library/book');
  }

  private getMemberClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/member');
  }

}
