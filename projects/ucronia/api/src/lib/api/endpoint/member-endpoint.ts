import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResponse, SimpleResponse, Sorting } from '@bernardo-mg/request';
import { Member, MembershipEvolutionMonth } from '@ucronia/domain';
import { addMinutes } from 'date-fns';
import { catchError, map, Observable } from 'rxjs';
import { ErrorRequestInterceptor } from '../error-request-interceptor';

export class MemberEndpoint {

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
  ): Observable<PaginatedResponse<Member>> {
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

    return this.http.get<PaginatedResponse<Member>>(`${this.apiUrl}/member`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

  public evolution(
    from: Date | undefined = undefined,
    to: Date | undefined = undefined
  ): Observable<MembershipEvolutionMonth[]> {
    const offset = new Date().getTimezoneOffset();
    let params = new HttpParams();

    if (from) {
      const fromUtc = addMinutes(from, offset);
      params = params.append('from', fromUtc.toISOString());
    }
    if (to) {
      const toUtc = addMinutes(to, offset);
      params = params.append('to', toUtc.toISOString());
    }

    return this.http.get<SimpleResponse<MembershipEvolutionMonth[]>>(`${this.apiUrl}/member/evolution`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(r => r.content)
      );
  }

}