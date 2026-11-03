import { Injectable, inject } from '@angular/core';
import { Page, Sorting } from '@bernardo-mg/request';
import { UcroniaClient } from '@ucronia/api';
import { BookLending } from '@ucronia/domain';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibraryLendingService {

  private readonly ucroniaClient = inject(UcroniaClient);

  // TODO: Add backend loan title search before enabling the lending search control.
  public getAll(page: number | undefined = undefined, sort: Sorting): Observable<Page<BookLending>> {
    return this.ucroniaClient.library.lending.page(page, undefined, sort);
  }

}
