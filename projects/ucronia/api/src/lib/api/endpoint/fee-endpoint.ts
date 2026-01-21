import { HttpClient, HttpParams } from '@angular/common/http';
import { SimpleResponse, SortingProperty } from '@bernardo-mg/request';
import { MemberFees, MemberStatus, YearsRange } from '@ucronia/domain';
import { catchError, map, Observable } from 'rxjs';
import { ErrorRequestInterceptor } from '../error-request-interceptor';

export class FeeEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  public year(year: number, active: MemberStatus): Observable<MemberFees[]> {
    const defaultProperties = [new SortingProperty('firstName'), new SortingProperty('lastName')];

    let status;
    if (active) {
      status = active.toString().toUpperCase();
    } else {
      status = '';
    }

    let params = new HttpParams();
    params = params.append('status', status);

    defaultProperties.forEach((property) => params = params.append('sort', `${String(property.property)}|${property.direction}`));

    return this.http.get<SimpleResponse<MemberFees[]>>(`${this.apiUrl}/fee/${year}`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public range(): Observable<YearsRange> {
    return this.http.get<SimpleResponse<YearsRange>>(`${this.apiUrl}/fee/range`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

}