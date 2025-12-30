import { Injectable, inject } from '@angular/core';
import { AngularCrudClientProvider, PaginatedResponse, PaginationParams, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { ContactMethod } from "@ucronia/domain";
import { environment } from 'environments/environment';
import { Observable, expand, of, reduce } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberProfileMethodService {

  private readonly contactMethodClient;

  constructor() {
    const clientProvider = inject(AngularCrudClientProvider);

    this.contactMethodClient = clientProvider.url(environment.apiUrl + '/contact/contactMethod');
  }

  public getAll(): Observable<ContactMethod[]> {
    const sorting = new SortingParams(
      [new SortingProperty('name')]
    );
    const pageSize = 100;

    return this.contactMethodClient
      .loadParameters(new PaginationParams(1, pageSize))
      .loadParameters(sorting)
      .read<PaginatedResponse<ContactMethod>>()
      .pipe(
        expand(response => {
          if (!response.last) {
            const nextPage = response.page + 1;
            return this.contactMethodClient
              .loadParameters(new PaginationParams(nextPage, pageSize))
              .loadParameters(sorting)
              .read<PaginatedResponse<ContactMethod>>();
          }
          return of();
        }),
        // accumulate from all pages into one array
        reduce((methods: ContactMethod[], res?: PaginatedResponse<ContactMethod>) => {
          return res ? [...methods, ...res.content] : methods;
        }, [])
      );
  }


}
