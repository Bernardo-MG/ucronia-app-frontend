import { HttpClient, HttpParams } from '@angular/common/http';
import { Page, PaginatedResponse, SimpleResponse, Sorting } from '@bernardo-mg/request';
import { Member, MembershipEvolutionMonth } from '@ucronia/domain';
import { format } from 'date-fns';
import { catchError, map, Observable } from 'rxjs';
import { MemberSummary } from '../../members/member-summary';
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
  ): Observable<Page<Member>> {
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

  public summary(): Observable<MemberSummary> {
    return this.http.get<SimpleResponse<MemberSummary>>(`${this.apiUrl}/member/summary`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(r => r.content)
      );
  }

  public evolution(
    from: Date | undefined = undefined,
    to: Date | undefined = undefined
  ): Observable<MembershipEvolutionMonth[]> {
    let params = new HttpParams();

    if (from) {
      params = params.append('from', format(from, 'yyyy-MM'));
    }
    if (to) {
      params = params.append('to', format(to, 'yyyy-MM'));
    }

    return this.http.get<SimpleResponse<MembershipEvolutionMonth[]>>(`${this.apiUrl}/member/evolution`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(r => r.content)
      );
  }

}