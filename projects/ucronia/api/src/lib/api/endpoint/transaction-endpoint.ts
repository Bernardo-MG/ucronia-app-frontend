import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Page, PaginatedResponse, SimpleResponse, Sorting } from '@bernardo-mg/request';
import { Month } from '@bernardo-mg/ui';
import { Transaction, TransactionSummary, TransactionMonthlyBalance, TransactionMonthsRange } from '@ucronia/domain';
import { addMinutes } from 'date-fns';
import { catchError, map, Observable } from 'rxjs';
import { TransactionUpdate } from '../../transaction/transaction-update';
import { ErrorRequestInterceptor } from '../error-request-interceptor';

export class TransactionEndpoint {

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
  ): Observable<Page<Transaction>> {
    const offset = new Date().getTimezoneOffset();

    let params = new HttpParams();
    if (page) {
      params = params.append('page', page);
    }
    if (size) {
      params = params.append('size', size);
    }

    sort?.properties
      .forEach((property) => params = params.append('sort', `${String(property.property)}|${property.direction}`));

    if (from) {
      const fromUtc = addMinutes(from, offset);
      params = params.append('from', fromUtc.toISOString());
    }
    if (to) {
      const toUtc = addMinutes(to, offset);
      params = params.append('to', toUtc.toISOString());
    }

    return this.http.get<PaginatedResponse<Transaction>>(`${this.apiUrl}/transaction`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

  public get(
    index: number
  ): Observable<Transaction> {
    return this.http.get<SimpleResponse<Transaction>>(`${this.apiUrl}/transaction/${index}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public create(
    data: Transaction
  ): Observable<Transaction> {
    return this.http.post<SimpleResponse<Transaction>>(`${this.apiUrl}/transaction`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public update(
    index: number,
    data: TransactionUpdate
  ): Observable<Transaction> {
    return this.http.put<SimpleResponse<Transaction>>(`${this.apiUrl}/transaction/${index}`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public delete(
    index: number
  ): Observable<Transaction> {
    return this.http.delete<SimpleResponse<Transaction>>(`${this.apiUrl}/transaction/${index}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public excel(): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'application/vnd.ms-excel'
    });

    return this.http.get(`${this.apiUrl}/transaction`, {
      headers,
      responseType: 'blob'
    }).pipe(
      map((response: Blob) => {
        const blob = new Blob([response], { type: 'application/vnd.ms-excel' });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = 'ucronia_transactions';
        anchor.click();
        window.URL.revokeObjectURL(url);
      })
    );
  }

  public summary(): Observable<TransactionSummary> {
    return this.http.get<SimpleResponse<TransactionSummary>>(`${this.apiUrl}/transaction/summary`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public monthlyBalance(
    from: Date | undefined,
    to: Date | undefined
  ): Observable<TransactionMonthlyBalance[]> {
    const offset = new Date().getTimezoneOffset();
    let fromUtc;
    let toUtc;

    let params = new HttpParams();
    if (from) {
      fromUtc = addMinutes(from, offset);
      params = params.append('from', fromUtc.toISOString());
    }
    if (to) {
      toUtc = addMinutes(to, offset);
      params = params.append('to', toUtc.toISOString());
    }

    return this.http.get<SimpleResponse<TransactionMonthlyBalance[]>>(`${this.apiUrl}/transaction/balance/monthly`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public range(): Observable<Month[]> {
    return this.http.get<SimpleResponse<TransactionMonthsRange>>(`${this.apiUrl}/transaction/range`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content),
        map(r => r.months.map(m => {
          const date = new Date(m);
          const month = new Month(date.getFullYear(), date.getMonth() + 1);

          return month;
        }))
      );
  }

}
