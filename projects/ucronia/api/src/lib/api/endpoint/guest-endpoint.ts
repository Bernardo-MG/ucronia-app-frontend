import { HttpClient, HttpParams } from '@angular/common/http';
import { Page, PaginatedResponse, SimpleResponse, Sorting } from '@bernardo-mg/request';
import { Guest } from '@ucronia/domain';
import { catchError, map, Observable } from 'rxjs';
import { GuestPatch } from '../../guests/guest-patch';
import { ErrorRequestInterceptor } from '../error-request-interceptor';

export class GuestEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  public page(
    page: number | undefined = undefined,
    size: number | undefined = undefined,
    sort: Sorting | undefined = undefined,
    name: string
  ): Observable<Page<Guest>> {
    let params = new HttpParams();
    if (page) {
      params = params.append('page', page);
    }
    if (size) {
      params = params.append('size', size);
    }

    sort?.properties.forEach((property) => params = params.append('sort', `${String(property.property)}|${property.direction}`));

    params = params.append('status', status);
    params = params.append('name', name);

    return this.http.get<PaginatedResponse<Guest>>(`${this.apiUrl}/profile/guest`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

  public get(
    number: number
  ): Observable<Guest> {
    return this.http.get<SimpleResponse<Guest>>(`${this.apiUrl}/profile/guest/${number}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public patch(
    number: number,
    data: GuestPatch
  ): Observable<Guest> {
    return this.http.patch<SimpleResponse<Guest>>(`${this.apiUrl}/profile/guest/${number}`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public delete(
    number: number
  ): Observable<Guest> {
    return this.http.delete<SimpleResponse<Guest>>(`${this.apiUrl}/profile/guest/${number}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

}