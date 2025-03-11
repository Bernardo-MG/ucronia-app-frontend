import { Injectable } from '@angular/core';
import { Active } from '@app/association/members/model/active';
import { BookLent } from '@app/models/library/book-lent';
import { BookReturned } from '@app/models/library/book-returned';
import { Member } from '@app/models/members/member';
import { AngularCrudClientProvider, PaginatedResponse, PaginationParams, SimpleResponse, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibraryLendingService {

  private readonly lendingClient;

  private readonly memberClient;

  constructor(
    clientProvider: AngularCrudClientProvider
  ) {
    this.lendingClient = clientProvider.url(environment.apiUrl + '/library/lending');
    this.memberClient = clientProvider.url(environment.apiUrl + '/member');
  }

  public lend(data: BookLent): Observable<BookLent> {
    return this.lendingClient
      .create<SimpleResponse<BookLent>>(data)
      .pipe(map(r => r.content));
  }

  public return(data: BookReturned): Observable<BookReturned> {
    return this.lendingClient
      .update<SimpleResponse<BookReturned>>(data)
      .pipe(map(r => r.content));
  }

  public getMembers(page: number, active: Active): Observable<PaginatedResponse<Member>> {
    return this.memberClient
      .loadParameters(new PaginationParams(page))
      .loadParameters(new SortingParams([new SortingProperty('firstName'), new SortingProperty('lastName'), new SortingProperty('number')]))
      .parameter('status', active.toString().toUpperCase())
      .read<PaginatedResponse<Member>>();
  }

}
