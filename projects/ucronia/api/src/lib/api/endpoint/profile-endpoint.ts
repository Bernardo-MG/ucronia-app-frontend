import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PaginatedResponse, SimpleResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { Month } from '@bernardo-mg/ui';
import { Member, MemberStatus, Profile, Transaction, TransactionCalendarMonthsRange, TransactionCurrentBalance, TransactionMonthlyBalance } from '@ucronia/domain';
import { addDays, addMinutes, format, lastDayOfMonth, startOfMonth } from 'date-fns';
import { catchError, map, Observable } from 'rxjs';
import { ErrorRequestInterceptor } from '../error-request-interceptor';
import { toParam } from '../sorting-param-parser';
import { ProfileCreation } from '../../profiles/profile-creation';
import { ProfilePatch } from '../../profiles/profile-patch';

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

}