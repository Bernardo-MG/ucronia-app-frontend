import { HttpClient } from '@angular/common/http';
import { SimpleResponse } from '@bernardo-mg/request';
import { catchError, map, Observable } from 'rxjs';
import { Account } from '../../domain/account';
import { ErrorRequestInterceptor } from '../error-request-interceptor';

export class AccountEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  public get(): Observable<Account> {
    return this.http.get<SimpleResponse<Account>>(`${this.apiUrl}/account`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

}
