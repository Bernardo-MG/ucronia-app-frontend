import { HttpClient } from '@angular/common/http';
import { SimpleResponse } from '@bernardo-mg/request';
import { PublicSettings, Setting } from '@ucronia/domain';
import { catchError, map, Observable } from 'rxjs';
import { SettingUpdate } from '../../setting/setting-update';
import { ErrorRequestInterceptor } from '../error-request-interceptor';

export class SettingEndpoint {

  private readonly publicSettingEndpoint;

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) {
    this.publicSettingEndpoint = new PublicSettingEndpoint(http, apiUrl);
  }

  get public() {
    return this.publicSettingEndpoint;
  }

  public getAll(): Observable<Setting[]> {
    return this.http.get<SimpleResponse<Setting[]>>(`${this.apiUrl}/settings`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public get(
    code: string
  ): Observable<Setting> {
    return this.http.get<SimpleResponse<Setting>>(`${this.apiUrl}/settings/${code}`)
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

export class PublicSettingEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  public get(): Observable<PublicSettings> {
    return this.http.get<SimpleResponse<PublicSettings>>(`${this.apiUrl}/settings/public`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

}
