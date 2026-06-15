import { HttpClient, HttpParams } from '@angular/common/http';
import { Page, PaginatedResponse, SimpleResponse, Sorting } from '@bernardo-mg/request';
import { Activity } from '@ucronia/domain';
import { catchError, map, Observable } from 'rxjs';
import { ErrorRequestInterceptor } from '../error-request-interceptor';

export class ActivityEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  public page(
    page: number | undefined = undefined,
    size: number | undefined = undefined,
    sort: Sorting | undefined = undefined
  ): Observable<Page<Activity>> {
    let params = new HttpParams();
    if (page) {
      params = params.append('page', page);
    }
    if (size) {
      params = params.append('size', size);
    }

    sort?.properties
      .forEach((property) => params = params.append('sort', `${String(property.property)}|${property.direction}`));

    return this.http.get<PaginatedResponse<Activity>>(`${this.apiUrl}/activity`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

  public get(
    index: number
  ): Observable<Activity> {
    return this.http.get<SimpleResponse<Activity>>(`${this.apiUrl}/activity/${index}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public create(
    data: Activity
  ): Observable<Activity> {
    return this.http.post<SimpleResponse<Activity>>(`${this.apiUrl}/activity`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public update(
    index: number,
    data: Activity
  ): Observable<Activity> {
    return this.http.put<SimpleResponse<Activity>>(`${this.apiUrl}/activity/${index}`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public delete(
    index: number
  ): Observable<Activity> {
    return this.http.delete<SimpleResponse<Activity>>(`${this.apiUrl}/activity/${index}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

}
