import { HttpClient } from '@angular/common/http';
import { SimpleResponse } from '@bernardo-mg/request';
import { Guest, Member, Sponsor } from '@ucronia/domain';
import { catchError, map, Observable } from 'rxjs';
import { ProfileMembershipConversion } from '../../members/profile-membership-conversion';
import { ErrorRequestInterceptor } from '../error-request-interceptor';

export class ProfileEndpoint {

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