import { HttpClient } from '@angular/common/http';
import { SimpleResponse } from '@bernardo-mg/request';
import { Setting } from '@ucronia/domain';
import { catchError, map, Observable } from 'rxjs';
import { SettingUpdate } from '../../setting/setting-update';
import { ErrorRequestInterceptor } from '../error-request-interceptor';

export class SettingEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  public getAll(): Observable<Setting[]> {
    return this.http.get<SimpleResponse<Setting[]>>(`${this.apiUrl}/settings`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public update(
    code: string, 
    data: SettingUpdate
  ): Observable<Setting> {
    return this.http.put<SimpleResponse<Setting>>(`${this.apiUrl}/settings/${code}`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

}
