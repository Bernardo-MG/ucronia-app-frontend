import { Injectable, inject } from '@angular/core';
import { PaginatedResponse, Sorting } from '@bernardo-mg/request';
import { UcroniaClient } from '@ucronia/api';
import { BookLending } from '@ucronia/domain';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibraryLendingService {

  private readonly ucroniaClient = inject(UcroniaClient);

  public getAll(page: number | undefined = undefined, sort: Sorting): Observable<PaginatedResponse<BookLending>> {
    return this.ucroniaClient.library.lending.page(page, undefined, sort);
  }

}
