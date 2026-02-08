import { HttpClient, HttpParams } from '@angular/common/http';
import { Page, PaginatedResponse, SimpleResponse, Sorting } from '@bernardo-mg/request';
import { Sponsor } from '@ucronia/domain';
import { catchError, map, Observable } from 'rxjs';
import { ProfileCreation } from '../../profile/profile-creation';
import { SponsorPatch } from '../../sponsor/sponsor-patch';
import { ErrorRequestInterceptor } from '../error-request-interceptor';

export class SponsorEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  public page(
    page: number | undefined = undefined,
    size: number | undefined = undefined,
    sort: Sorting | undefined = undefined,
    name: string | undefined = undefined
  ): Observable<Page<Sponsor>> {
    let params = new HttpParams();
    if (page) {
      params = params.append('page', page);
    }
    if (size) {
      params = params.append('size', size);
    }

    sort?.properties
      .forEach((property) => params = params.append('sort', `${String(property.property)}|${property.direction}`));

    if (name) {
      params = params.append('name', name);
    }

    return this.http.get<PaginatedResponse<Sponsor>>(`${this.apiUrl}/sponsor`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

  public get(
    number: number
  ): Observable<Sponsor> {
    return this.http.get<SimpleResponse<Sponsor>>(`${this.apiUrl}/sponsor/${number}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public create(
    data: ProfileCreation
  ): Observable<Sponsor> {
    return this.http.post<SimpleResponse<Sponsor>>(`${this.apiUrl}/sponsor`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public patch(
    number: number,
    data: SponsorPatch
  ): Observable<Sponsor> {
    return this.http.patch<SimpleResponse<Sponsor>>(`${this.apiUrl}/sponsor/${number}`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public delete(
    number: number
  ): Observable<Sponsor> {
    return this.http.delete<SimpleResponse<Sponsor>>(`${this.apiUrl}/sponsor/${number}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

}