import { inject, Injectable } from '@angular/core';
import { ContactMethod } from '@ucronia/domain';
import { AngularCrudClientProvider, PaginatedResponse, PaginationParams, SimpleResponse, Sorting, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactMethodService {
  
  private readonly client;

  constructor() {
    const clientProvider = inject(AngularCrudClientProvider);

    this.client = clientProvider.url(environment.apiUrl + '/contact/contactMethod');
  }

  public getAll(page: number): Observable<PaginatedResponse<ContactMethod>> {
    const sorting = new SortingParams(
      [new SortingProperty('name')]
    );

    return this.client
      .loadParameters(new PaginationParams(page))
      .loadParameters(sorting)
      .read<PaginatedResponse<ContactMethod>>();
  }

  public create(data: ContactMethod): Observable<ContactMethod> {
    return this.client
      .create<SimpleResponse<ContactMethod>>(data)
      .pipe(map(r => r.content));
  }

  public update(data: ContactMethod): Observable<ContactMethod> {
    return this.client
      .appendRoute(`/${data.number}`)
      .update<SimpleResponse<ContactMethod>>(data)
      .pipe(map(r => r.content));
  }

  public delete(number: number): Observable<ContactMethod> {
    return this.client
      .appendRoute(`/${number}`)
      .delete<SimpleResponse<ContactMethod>>()
      .pipe(map(r => r.content));
  }

}
