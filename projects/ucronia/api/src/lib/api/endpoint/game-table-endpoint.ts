import { HttpClient, HttpParams } from '@angular/common/http';
import { ErrorRequestInterceptor, Page, PaginatedResponse, SimpleResponse, Sorting } from '@bernardo-mg/request';
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

  public page(page: number | undefined = undefined, size: number | undefined = undefined,
    sort: Sorting | undefined = undefined): Observable<Page<GameTable>> {
    let params = new HttpParams();
    if (page) params = params.append('page', page);
    if (size) params = params.append('size', size);
    sort?.properties.forEach(property =>
      params = params.append('sort', `${String(property.property)}|${property.direction}`));
    return this.http.get<PaginatedResponse<GameTable>>(`${this.apiUrl}/game/table`, { params })
      .pipe(catchError(this.errorInterceptor.handle));
  }

  public create(data: GameTable): Observable<GameTable> {
    return this.http.post<SimpleResponse<GameTable>>(`${this.apiUrl}/game/table`, data)
      .pipe(catchError(this.errorInterceptor.handle), map(response => response.content));
  }

  public update(number: number, data: GameTable): Observable<GameTable> {
    return this.http.put<SimpleResponse<GameTable>>(`${this.apiUrl}/game/table/${number}`, data)
      .pipe(catchError(this.errorInterceptor.handle), map(response => response.content));
  }

  public delete(number: number): Observable<GameTable> {
    return this.http.delete<SimpleResponse<GameTable>>(`${this.apiUrl}/game/table/${number}`)
      .pipe(catchError(this.errorInterceptor.handle), map(response => response.content));
  }

}
