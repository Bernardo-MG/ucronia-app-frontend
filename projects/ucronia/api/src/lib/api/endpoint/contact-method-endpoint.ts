import { HttpClient, HttpParams } from '@angular/common/http';
import { Page, PaginatedResponse, SimpleResponse, Sorting } from '@bernardo-mg/request';
import { ContactMethod } from '@ucronia/domain';
import { catchError, map, Observable } from 'rxjs';
import { ContactMethodUpdate } from '../../profile/contact-method-update';
import { ErrorRequestInterceptor } from '../error-request-interceptor';

export class ContactMethodEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  public page(
    page: number | undefined = undefined,
    size: number | undefined = undefined,
    sort: Sorting | undefined = undefined
  ): Observable<Page<ContactMethod>> {
    let params = new HttpParams();
    if (page) {
      params = params.append('page', page);
    }
    if (size) {
      params = params.append('size', size);
    }

    sort?.properties.forEach((property) => params = params.append('sort', `${String(property.property)}|${property.direction}`));

    return this.http.get<PaginatedResponse<ContactMethod>>(`${this.apiUrl}/profile/contactMethod`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

  public create(
    data: ContactMethod
  ): Observable<ContactMethod> {
    return this.http.post<SimpleResponse<ContactMethod>>(`${this.apiUrl}/profile/contactMethod`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public update(
    number: number,
    data: ContactMethodUpdate
  ): Observable<ContactMethod> {
    return this.http.put<SimpleResponse<ContactMethod>>(`${this.apiUrl}/profile/contactMethod/${number}`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public delete(
    number: number
  ): Observable<ContactMethod> {
    return this.http.delete<SimpleResponse<ContactMethod>>(`${this.apiUrl}/profile/contactMethod/${number}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

}