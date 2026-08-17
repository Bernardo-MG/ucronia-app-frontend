import { HttpClient, HttpParams } from '@angular/common/http';
import { ErrorRequestInterceptor, Page, PaginatedResponse, SimpleResponse, Sorting } from '@bernardo-mg/request';
import { Fee, FeePayments, FeeSummary, MemberFees, MemberFeesFee, MemberStatus, YearsRange } from '@ucronia/domain';
import { catchError, map, Observable } from 'rxjs';
import { FeeCreation } from '../../fees/fee-creation';
import { FeeUpdate } from '../../fees/fee-update';

export class FeeEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  public page(
    page: number | undefined = undefined,
    size: number | undefined = undefined,
    sort: Sorting | undefined = undefined,
    from: Date | undefined,
    to: Date | undefined
  ): Observable<Page<Fee>> {
    let params = new HttpParams();
    if (page) {
      params = params.append('page', page);
    }
    if (size) {
      params = params.append('size', size);
    }

    sort?.properties.forEach((property) => params = params.append('sort', `${String(property.property)}|${property.direction}`));

    if (from) {
      params = params.append('from', from.toISOString());
    }
    if (to) {
      params = params.append('to', to.toISOString());
    }

    return this.http.get<PaginatedResponse<Fee>>(`${this.apiUrl}/fee`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

  private mapFee(fee: Fee): Fee {
    fee.month = new Date(fee.month);
    if (fee.transaction?.date) {
      fee.transaction.date = new Date(fee.transaction.date);
    }
    return fee;
  }

  private mapMemberFee(fee: MemberFeesFee): MemberFeesFee {
    fee.month = new Date(fee.month);
    return fee;
  }

  private mapMemberFees(list: MemberFees[]): MemberFees[] {
    return list.map(mf => {
      mf.fees = mf.fees.map(f => this.mapMemberFee(f));
      return mf;
    });
  }

  public get(
    member: number,
    month: Date
  ): Observable<Fee> {
    return this.http
      .get<SimpleResponse<Fee>>(`${this.apiUrl}/fee/${month.toISOString()}/${member}`)
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
  ): Observable<Fee> {
    return this.http.post<SimpleResponse<Fee>>(`${this.apiUrl}/fee`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(r => this.mapFee(r.content))
      );
  }

  public pay(
    data: FeePayments
  ): Observable<Fee[]> {
    return this.http.post<SimpleResponse<Fee[]>>(`${this.apiUrl}/fee/pay`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(r => r.content.map((f) => this.mapFee(f)))
      );
  }

  public update(
    member: number,
    month: Date,
    data: FeeUpdate
  ): Observable<Fee> {
    return this.http
      .put<SimpleResponse<Fee>>(`${this.apiUrl}/fee/${month.toISOString()}/${member}`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(r => this.mapFee(r.content))
      );
  }

  public delete(
    member: number,
    month: Date
  ): Observable<Fee> {
    return this.http
      .delete<SimpleResponse<Fee>>(`${this.apiUrl}/fee/${month.toISOString()}/${member}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(r => this.mapFee(r.content))
      );
  }

  public summary(
    from: Date,
    to: Date
  ): Observable<FeeSummary> {
    let params = new HttpParams();
    params = params.append('from', from.toISOString());
    params = params.append('to', to.toISOString());

    return this.http.get<SimpleResponse<FeeSummary>>(`${this.apiUrl}/fee/summary`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(r => r.content)
      );
  }

}