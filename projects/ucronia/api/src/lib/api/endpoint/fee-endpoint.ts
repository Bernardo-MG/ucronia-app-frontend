import { HttpClient, HttpParams } from '@angular/common/http';
import { SimpleResponse, SortingProperty } from '@bernardo-mg/request';
import { Fee, FeePayment, FeePaymentReport, MemberFees, MemberStatus, YearsRange } from '@ucronia/domain';
import { format } from 'date-fns';
import { catchError, map, Observable } from 'rxjs';
import { FeeCreation } from '../../fees/fee-creation';
import { FeeUpdate } from '../../fees/fee-update';
import { ErrorRequestInterceptor } from '../error-request-interceptor';

export class FeeEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  public get(member: number, month: Date): Observable<Fee> {
    const formattedMonth = format(month, 'yyyy-MM')
    return this.http.get<SimpleResponse<Fee>>(`${this.apiUrl}/fee/${formattedMonth}/${member}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

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

  public create(data: FeeCreation): Observable<FeePayment> {
    return this.http.post<SimpleResponse<FeePayment>>(`${this.apiUrl}/fee`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public pay(data: FeePayment): Observable<FeePayment> {
    return this.http.post<SimpleResponse<FeePayment>>(`${this.apiUrl}/fee/pay`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public update(member: number, month: Date, data: FeeUpdate): Observable<Fee> {
    const formattedMonth = format(month, 'yyyy-MM')
    return this.http.put<SimpleResponse<Fee>>(`${this.apiUrl}/fee/${formattedMonth}/${member}`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public delete(member: number, month: Date): Observable<Fee> {
    const formattedMonth = format(month, 'yyyy-MM')
    return this.http.delete<SimpleResponse<Fee>>(`${this.apiUrl}/fee/${formattedMonth}/${member}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public balance(): Observable<FeePaymentReport> {
    return this.http.get<SimpleResponse<FeePaymentReport>>(`${this.apiUrl}/fee/balance`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

}