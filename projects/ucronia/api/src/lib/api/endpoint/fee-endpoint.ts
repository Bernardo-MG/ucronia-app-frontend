import { HttpClient, HttpParams } from '@angular/common/http';
import { SimpleResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { Fee, FeePayments, FeePaymentSummary, MemberFees, MemberStatus, YearsRange } from '@ucronia/domain';
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

  private mapFee(fee: Fee): Fee {
    fee.month = new Date(fee.month);
    if (fee.transaction?.date) {
      fee.transaction.date = new Date(fee.transaction.date);
    }
    return fee;
  }

  private mapMemberFees(list: MemberFees[]): MemberFees[] {
    return list.map(mf => {
      mf.fees = mf.fees.map(f => {
        f.month = new Date(f.month);
        return f;
      });
      return mf;
    });
  }

  private mapFeePayments(fp: FeePayments): FeePayments {
    if (fp.paymentDate?.date) {
      fp.paymentDate.date = new Date(fp.paymentDate.date);
    }
    fp.months = fp.months.map(m => new Date(m));
    return fp;
  }

  public get(
    member: number,
    month: Date
  ): Observable<Fee> {
    const formattedMonth = format(month, 'yyyy-MM');
    return this.http
      .get<SimpleResponse<Fee>>(`${this.apiUrl}/fee/${formattedMonth}/${member}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(r => this.mapFee(r.content))
      );
  }

  public year(
    year: number,
    active: MemberStatus,
    sort: Sorting | undefined = undefined
  ): Observable<MemberFees[]> {
    let status;
    if (active) {
      status = active.toString().toUpperCase();
    } else {
      status = '';
    }

    let params = new HttpParams();
    params = params.append('status', status);

    sort?.properties.forEach((property) => params = params.append('sort', `${String(property.property)}|${property.direction}`));

    return this.http.get<SimpleResponse<MemberFees[]>>(`${this.apiUrl}/fee/${year}`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(r => this.mapMemberFees(r.content))
      );
  }

  public range(): Observable<YearsRange> {
    return this.http.get<SimpleResponse<YearsRange>>(`${this.apiUrl}/fee/range`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(r => r.content)
      );
  }

  public create(
    data: FeeCreation
  ): Observable<FeePayments> {
    return this.http.post<SimpleResponse<FeePayments>>(`${this.apiUrl}/fee`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(r => this.mapFeePayments(r.content))
      );
  }

  public pay(
    data: FeePayments
  ): Observable<FeePayments> {
    return this.http.post<SimpleResponse<FeePayments>>(`${this.apiUrl}/fee/pay`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(r => this.mapFeePayments(r.content))
      );
  }

  public update(
    member: number,
    month: Date,
    data: FeeUpdate
  ): Observable<Fee> {
    const formattedMonth = format(month, 'yyyy-MM');
    return this.http
      .put<SimpleResponse<Fee>>(`${this.apiUrl}/fee/${formattedMonth}/${member}`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(r => this.mapFee(r.content))
      );
  }

  public delete(
    member: number,
    month: Date
  ): Observable<Fee> {
    const formattedMonth = format(month, 'yyyy-MM');
    return this.http
      .delete<SimpleResponse<Fee>>(`${this.apiUrl}/fee/${formattedMonth}/${member}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(r => this.mapFee(r.content))
      );
  }

  public summary(): Observable<FeePaymentSummary> {
    return this.http.get<SimpleResponse<FeePaymentSummary>>(`${this.apiUrl}/fee/summary`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(r => r.content)
      );
  }

}