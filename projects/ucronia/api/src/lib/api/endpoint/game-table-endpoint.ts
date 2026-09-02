import { HttpClient } from '@angular/common/http';
import { ErrorRequestInterceptor, SimpleResponse } from '@bernardo-mg/request';
import { GameTable } from '@ucronia/domain';
import { catchError, map, Observable } from 'rxjs';

export class GameTableEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  public get(number: number): Observable<GameTable> {
    return this.http.get<SimpleResponse<GameTable>>(`${this.apiUrl}/game/table/${number}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

}
