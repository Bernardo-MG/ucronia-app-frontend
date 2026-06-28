import { HttpClient } from '@angular/common/http';
import { ErrorRequestInterceptor, SimpleResponse } from '@bernardo-mg/request';
import { catchError, map, Observable } from 'rxjs';
import { Account } from '../../domain/account';

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
