import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Active } from '@app/association/members/model/active';
import { BookLent } from '@app/models/library/book-lent';
import { BookReturned } from '@app/models/library/book-returned';
import { Member } from '@app/models/members/member';
import { AngularCrudClient, CrudClient, PaginatedResponse, PaginationParams, SimpleResponse, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibraryLendingService {

  constructor(
    private http: HttpClient
  ) { }

  public lend(data: BookLent): Observable<BookLent> {
    return this.getLendClient().create<SimpleResponse<BookLent>>(data)
      .pipe(map(r => r.content));
  }

  public return(data: BookReturned): Observable<BookReturned> {
    return this.getLendClient().update<SimpleResponse<BookReturned>>(data)
      .pipe(map(r => r.content));
  }

  public getMembers(page: number, active: Active): Observable<PaginatedResponse<Member>> {
    return this.getMemberClient()
      .loadParameters(new PaginationParams(page))
      .loadParameters(new SortingParams([new SortingProperty('firstName'), new SortingProperty('lastName'), new SortingProperty('number')]))
      .parameter('status', active.toString().toUpperCase())
      .read<PaginatedResponse<Member>>();
  }

  private getLendClient(): CrudClient {
    return new AngularCrudClient(this.http, environment.apiUrl + '/library/lending');
  }

  private getMemberClient(): CrudClient {
    return new AngularCrudClient(this.http, environment.apiUrl + '/member');
  }

}
