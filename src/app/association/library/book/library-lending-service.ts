import { Injectable, inject } from '@angular/core';
import { PaginatedResponse, Sorting } from '@bernardo-mg/request';
import { BookLending } from "@ucronia/domain";
import { UcroniaClient } from 'projects/ucronia/api/src/lib/api/ucronia-client';
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
