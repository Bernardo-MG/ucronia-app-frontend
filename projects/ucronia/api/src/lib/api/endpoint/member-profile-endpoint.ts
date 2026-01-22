import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResponse, SimpleResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { MemberProfile, MemberStatus, Profile } from '@ucronia/domain';
import { catchError, map, Observable } from 'rxjs';
import { ProfileCreation } from '../../profiles/profile-creation';
import { ProfilePatch } from '../../profiles/profile-patch';
import { ErrorRequestInterceptor } from '../error-request-interceptor';
import { toParam } from '../sorting-param-parser';
import { MemberProfilePatch } from '../../members/member-profile-patch';

export class MemberProfileEndpoint {

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
  ): Observable<PaginatedResponse<MemberProfile>> {
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

    return this.http.get<PaginatedResponse<MemberProfile>>(`${this.apiUrl}/profile/member`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }
  
  public patch(data: MemberProfilePatch): Observable<MemberProfile> {
    return this.http.patch<SimpleResponse<MemberProfile>>(`${this.apiUrl}/profile/member`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public delete(index: number): Observable<MemberProfile> {
    return this.http.delete<SimpleResponse<MemberProfile>>(`${this.apiUrl}/profile/member/${index}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public get(index: number): Observable<MemberProfile> {
    return this.http.get<SimpleResponse<MemberProfile>>(`${this.apiUrl}/profile/member/${index}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

}