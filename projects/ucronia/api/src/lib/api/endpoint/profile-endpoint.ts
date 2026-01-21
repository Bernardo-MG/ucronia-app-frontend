import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResponse, SimpleResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { Guest, Member, MemberStatus, Profile, Sponsor } from '@ucronia/domain';
import { catchError, map, Observable } from 'rxjs';
import { ProfileCreation } from '../../profiles/profile-creation';
import { ProfilePatch } from '../../profiles/profile-patch';
import { ErrorRequestInterceptor } from '../error-request-interceptor';
import { toParam } from '../sorting-param-parser';
import { ProfileMembershipConversion } from '../../members/profile-membership-conversion';

export class ProfileEndpoint {

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
  ): Observable<PaginatedResponse<Profile>> {
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

    return this.http.get<PaginatedResponse<Profile>>(`${this.apiUrl}/profile`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }
  
  public create(data: ProfileCreation): Observable<Profile> {
    return this.http.post<SimpleResponse<Profile>>(`${this.apiUrl}/profile`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public patch(data: ProfilePatch): Observable<Profile> {
    return this.http.patch<SimpleResponse<Profile>>(`${this.apiUrl}/profile`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public delete(index: number): Observable<Profile> {
    return this.http.delete<SimpleResponse<Profile>>(`${this.apiUrl}/profile/${index}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public one(index: number): Observable<Profile> {
    return this.http.get<SimpleResponse<Profile>>(`${this.apiUrl}/profile/${index}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public toMember(number: number, feeType: number): Observable<Member> {
    const conversion: ProfileMembershipConversion = {
      feeType
    };

    return this.http.put<SimpleResponse<Member>>(`${this.apiUrl}/profile/${number}/member`, conversion)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public toSponsor(number: number): Observable<Sponsor> {
    return this.http.put<SimpleResponse<Sponsor>>(`${this.apiUrl}/profile/${number}/member`, undefined)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public toGuest(number: number): Observable<Guest> {
    return this.http.put<SimpleResponse<Guest>>(`${this.apiUrl}/profile/${number}/guest`, undefined)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

}