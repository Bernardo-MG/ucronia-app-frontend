import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResponse, SimpleResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { MemberStatus, Sponsor } from '@ucronia/domain';
import { catchError, map, Observable } from 'rxjs';
import { ProfileCreation } from '../../profiles/profile-creation';
import { ErrorRequestInterceptor } from '../error-request-interceptor';
import { toParam } from '../sorting-param-parser';
import { SponsorPatch } from '../../sponsor/sponsor-patch';

export class SponsorEndpoint {

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
  ): Observable<PaginatedResponse<Sponsor>> {
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

    return this.http.get<PaginatedResponse<Sponsor>>(`${this.apiUrl}/sponsor`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

  public get(number: number): Observable<Sponsor> {
    return this.http.get<SimpleResponse<Sponsor>>(`${this.apiUrl}/sponsor/${number}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public create(data: ProfileCreation): Observable<Sponsor> {
    return this.http.post<SimpleResponse<Sponsor>>(`${this.apiUrl}/sponsor`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public patch(number: number, data: SponsorPatch): Observable<Sponsor> {
    return this.http.patch<SimpleResponse<Sponsor>>(`${this.apiUrl}/sponsor/${number}`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public delete(number: number): Observable<Sponsor> {
    return this.http.delete<SimpleResponse<Sponsor>>(`${this.apiUrl}/sponsor/${number}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

}