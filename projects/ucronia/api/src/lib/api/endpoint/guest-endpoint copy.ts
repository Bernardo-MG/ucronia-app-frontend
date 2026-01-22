import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResponse, SimpleResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { Guest, MemberStatus } from '@ucronia/domain';
import { catchError, map, Observable } from 'rxjs';
import { GuestPatch } from '../../guests/guest-patch';
import { ErrorRequestInterceptor } from '../error-request-interceptor';
import { toParam } from '../sorting-param-parser';

export class GuestEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  public page(
    page: number | undefined,
    sort: Sorting,
    active: MemberStatus,
    name: string
  ): Observable<PaginatedResponse<Guest>> {
    const defaultProperties = [new SortingProperty('firstName'), new SortingProperty('lastName'), new SortingProperty('number')];

    let params = new HttpParams();
    if (page) {
      params = params.append('page', page);
    }

    const status = active ? active.toString().toUpperCase() : '';

    toParam(sort.properties, defaultProperties)
      .forEach((property) => params = params.append('sort', `${String(property.property)}|${property.direction}`));

    params = params.append('status', status);
    params = params.append('name', name);

    return this.http.get<PaginatedResponse<Guest>>(`${this.apiUrl}/profile/guest`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }
  
  public patch(data: GuestPatch): Observable<Guest> {
    return this.http.patch<SimpleResponse<Guest>>(`${this.apiUrl}/profile/guest`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public delete(index: number): Observable<Guest> {
    return this.http.delete<SimpleResponse<Guest>>(`${this.apiUrl}/profile/guest/${index}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public get(index: number): Observable<Guest> {
    return this.http.get<SimpleResponse<Guest>>(`${this.apiUrl}/profile/guest/${index}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

}