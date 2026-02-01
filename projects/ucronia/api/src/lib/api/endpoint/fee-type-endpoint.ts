import { HttpClient, HttpParams } from '@angular/common/http';
import { Page, PaginatedResponse, SimpleResponse, Sorting } from '@bernardo-mg/request';
import { FeeType } from '@ucronia/domain';
import { catchError, map, Observable } from 'rxjs';
import { FeeTypeUpdate } from '../../fees/fee-type-update';
import { ErrorRequestInterceptor } from '../error-request-interceptor';

export class FeeTypeEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  public page(
    page: number | undefined = undefined,
    size: number | undefined = undefined,
    sort: Sorting | undefined = undefined
  ): Observable<Page<FeeType>> {
    let params = new HttpParams();
    if (page) {
      params = params.append('page', page);
    }
    if (size) {
      params = params.append('size', size);
    }

    sort?.properties.forEach((property) => params = params.append('sort', `${String(property.property)}|${property.direction}`));

    return this.http.get<PaginatedResponse<FeeType>>(`${this.apiUrl}/fee/type`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

  public create(
    data: FeeType
  ): Observable<FeeType> {
    return this.http.post<SimpleResponse<FeeType>>(`${this.apiUrl}/fee/type`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public update(
    number: number,
    data: FeeTypeUpdate
  ): Observable<FeeType> {
    return this.http.put<SimpleResponse<FeeType>>(`${this.apiUrl}/fee/type/${number}`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public delete(
    number: number
  ): Observable<FeeType> {
    return this.http.delete<SimpleResponse<FeeType>>(`${this.apiUrl}/fee/type/${number}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

}