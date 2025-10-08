import { Injectable, inject } from '@angular/core';
import { BookLending } from '@app/domain/library/book-lending';
import { AngularCrudClientProvider, PaginatedResponse, PaginationParams, Sorting, SortingParams } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibraryLendingService {

  private readonly lendingClient;

  constructor() {
    const clientProvider = inject(AngularCrudClientProvider);

    this.lendingClient = clientProvider.url(environment.apiUrl + '/library/lending');
  }

  public getAll(page: number, sort: Sorting): Observable<PaginatedResponse<BookLending>> {
    const sorting = new SortingParams(
      sort.properties
    );

    return this.lendingClient
      .loadParameters(new PaginationParams(page))
      .loadParameters(sorting)
      .read();
  }

}
