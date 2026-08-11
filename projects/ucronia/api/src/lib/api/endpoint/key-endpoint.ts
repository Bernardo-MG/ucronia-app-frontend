import { HttpClient } from '@angular/common/http';
import { ErrorRequestInterceptor, SimpleResponse } from '@bernardo-mg/request';
import { Key } from '@ucronia/domain';
import { catchError, map, Observable } from 'rxjs';
import { KeyCreation } from '../../members/key-creation';
import { KeyUpdate } from '../../members/key-update';

export class KeyEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  public getAll(): Observable<Key[]> {
    return this.http.get<SimpleResponse<Key[]>>(`${this.apiUrl}/profile/key`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public get(number: number): Observable<Key> {
    return this.http.get<SimpleResponse<Key>>(`${this.apiUrl}/profile/key/${number}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public create(data: KeyCreation): Observable<Key> {
    return this.http.post<SimpleResponse<Key>>(`${this.apiUrl}/profile/key`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public update(number: number, data: KeyUpdate): Observable<Key> {
    return this.http.put<SimpleResponse<Key>>(`${this.apiUrl}/profile/key/${number}`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public delete(number: number): Observable<Key> {
    return this.http.delete<SimpleResponse<Key>>(`${this.apiUrl}/profile/key/${number}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

}
