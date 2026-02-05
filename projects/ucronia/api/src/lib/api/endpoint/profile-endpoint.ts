import { HttpClient, HttpParams } from '@angular/common/http';
import { Page, PaginatedResponse, SimpleResponse, Sorting } from '@bernardo-mg/request';
import { Guest, Member, Profile, Sponsor } from '@ucronia/domain';
import { catchError, map, Observable } from 'rxjs';
import { ProfileMembershipConversion } from '../../members/profile-membership-conversion';
import { ProfileCreation } from '../../profile/profile-creation';
import { ProfilePatch } from '../../profile/profile-patch';
import { ErrorRequestInterceptor } from '../error-request-interceptor';

export class ProfileEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  private readonly transformProfileEndpoint;

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) {
    this.transformProfileEndpoint = new TransformProfileEndpoint(http, apiUrl);
  }

  public get transform() {
    return this.transformProfileEndpoint;
  }

  public page(
    page: number | undefined = undefined,
    size: number | undefined = undefined,
    sort: Sorting | undefined = undefined,
    name: string | undefined
  ): Observable<Page<Profile>> {
    let params = new HttpParams();
    if (page) {
      params = params.append('page', page);
    }
    if (size) {
      params = params.append('size', size);
    }

    sort?.properties
      .forEach((property) => params = params.append('sort', `${String(property.property)}|${property.direction}`));

    params = params.append('status', status);

    if (name) {
      params = params.append('name', name);
    }

    return this.http.get<PaginatedResponse<Profile>>(`${this.apiUrl}/profile`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

  public get(
    number: number
  ): Observable<Profile> {
    return this.http.get<SimpleResponse<Profile>>(`${this.apiUrl}/profile/${number}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public create(
    data: ProfileCreation
  ): Observable<Profile> {
    return this.http.post<SimpleResponse<Profile>>(`${this.apiUrl}/profile`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public patch(
    number: number,
    data: ProfilePatch
  ): Observable<Profile> {
    return this.http.patch<SimpleResponse<Profile>>(`${this.apiUrl}/profile/${number}`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public delete(
    number: number
  ): Observable<Profile> {
    return this.http.delete<SimpleResponse<Profile>>(`${this.apiUrl}/profile/${number}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

}

export class TransformProfileEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  public toMember(
    number: number,
    feeType: number
  ): Observable<Member> {
    const conversion: ProfileMembershipConversion = {
      feeType
    };

    return this.http.put<SimpleResponse<Member>>(`${this.apiUrl}/profile/${number}/member`, conversion)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public toSponsor(
    number: number
  ): Observable<Sponsor> {
    return this.http.put<SimpleResponse<Sponsor>>(`${this.apiUrl}/profile/${number}/member`, undefined)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public toGuest(
    number: number
  ): Observable<Guest> {
    return this.http.put<SimpleResponse<Guest>>(`${this.apiUrl}/profile/${number}/guest`, undefined)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

}