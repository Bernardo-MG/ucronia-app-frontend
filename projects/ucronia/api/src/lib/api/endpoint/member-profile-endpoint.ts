import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResponse, SimpleResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { MemberProfile, MemberStatus } from '@ucronia/domain';
import { catchError, map, Observable } from 'rxjs';
import { MemberProfilePatch } from '../../members/member-profile-patch';
import { ErrorRequestInterceptor } from '../error-request-interceptor';
import { mergeProperties } from '../sorting-param-merger';

export class MemberProfileEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  public page(
    page: number | undefined = undefined,
    size: number | undefined = undefined,
    sort: Sorting | undefined = undefined,
    active: MemberStatus,
    name: string | undefined
  ): Observable<PaginatedResponse<MemberProfile>> {
    let params = new HttpParams();
    if (page) {
      params = params.append('page', page);
    }
    if (size) {
      params = params.append('size', size);
    }

    const status = active ? active.toString().toUpperCase() : '';

    sort?.properties
      .forEach((property) => params = params.append('sort', `${String(property.property)}|${property.direction}`));

    params = params.append('status', status);
    if (name) {
      params = params.append('name', name);
    }

    return this.http.get<PaginatedResponse<MemberProfile>>(`${this.apiUrl}/profile/member`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

  public get(
    number: number
  ): Observable<MemberProfile> {
    return this.http.get<SimpleResponse<MemberProfile>>(`${this.apiUrl}/profile/member/${number}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public patch(
    number: number,
    data: MemberProfilePatch
  ): Observable<MemberProfile> {
    return this.http.patch<SimpleResponse<MemberProfile>>(`${this.apiUrl}/profile/member/${number}`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public delete(
    number: number
  ): Observable<MemberProfile> {
    return this.http.delete<SimpleResponse<MemberProfile>>(`${this.apiUrl}/profile/member/${number}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

}