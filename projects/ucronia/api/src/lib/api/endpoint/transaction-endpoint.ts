import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Page, PaginatedResponse, SimpleResponse, Sorting } from '@bernardo-mg/request';
import { Month } from '@bernardo-mg/ui';
import { Transaction, TransactionMonthlyBalance, TransactionMonthsRange, TransactionSummary } from '@ucronia/domain';
import { catchError, map, Observable } from 'rxjs';
import { TransactionUpdate } from '../../transaction/transaction-update';
import { ErrorRequestInterceptor } from '../error-request-interceptor';

export class TransactionEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  private mapTransaction(transaction: Transaction): Transaction {
    transaction.date = new Date(transaction.date);
    return transaction;
  }

  private mapTransactions(page: PaginatedResponse<Transaction>): PaginatedResponse<Transaction> {
    page.content = page.content.map(t => {
      t.date = new Date(t.date);
      return t;
    });

    return page;
  }

  public page(
    page: number | undefined = undefined,
    size: number | undefined = undefined,
    sort: Sorting | undefined = undefined,
    description: string | undefined,
    from: Date | undefined,
    to: Date | undefined
  ): Observable<Page<Transaction>> {
    let params = new HttpParams();
    if (page) {
      params = params.append('page', page);
    }
    if (size) {
      params = params.append('size', size);
    }

    sort?.properties
      .forEach((property) => params = params.append('sort', `${String(property.property)}|${property.direction}`));

    if (description) {
      params = params.append('description', description);
    }
    if (from) {
      params = params.append('from', from.toISOString());
    }
    if (to) {
      params = params.append('to', to.toISOString());
    }

    return this.http.get<PaginatedResponse<Transaction>>(`${this.apiUrl}/transaction`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(r => this.mapTransactions(r))
      );
  }

  public get(
    index: number
  ): Observable<Transaction> {
    return this.http.get<SimpleResponse<Transaction>>(`${this.apiUrl}/transaction/${index}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content),
        map(t => {
          t.date = new Date(t.date);
          return t;
        }),
        map(r => this.mapTransaction(r))
      );
  }

  public create(
    data: Transaction
  ): Observable<Transaction> {
    return this.http.post<SimpleResponse<Transaction>>(`${this.apiUrl}/transaction`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content),
        map(r => this.mapTransaction(r))
      );
  }

  public update(
    index: number,
    data: TransactionUpdate
  ): Observable<Transaction> {
    return this.http.put<SimpleResponse<Transaction>>(`${this.apiUrl}/transaction/${index}`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content),
        map(r => this.mapTransaction(r))
      );
  }

  public delete(
    index: number
  ): Observable<Transaction> {
    return this.http.delete<SimpleResponse<Transaction>>(`${this.apiUrl}/transaction/${index}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content),
        map(r => this.mapTransaction(r))
      );
  }

  public excel(): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'application/vnd.ms-excel'
    });

    return this.http.get(`${this.apiUrl}/transaction/report`, {
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
    let params = new HttpParams();

    if (from) {
      params = params.append('from', from.toISOString());
    }
    if (to) {
      params = params.append('to', to.toISOString());
    }

    return this.http.get<SimpleResponse<TransactionMonthlyBalance[]>>(`${this.apiUrl}/transaction/balance/monthly`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content),
        map(r => r.map(b => {
          b.month = new Date(b.month);
          return b;
        }))
      );
  }

  public range(): Observable<Month[]> {
    return this.http.get<SimpleResponse<TransactionMonthsRange>>(`${this.apiUrl}/transaction/range`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content),
        map(r => r.months.map(m => {
          const date = new Date(m);
          return new Month(date.getFullYear(), date.getMonth() + 1);
        }))
      );
  }

}
