import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResponse, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { Fee } from '@ucronia/domain';
import { catchError, Observable } from 'rxjs';
import { ErrorRequestInterceptor } from '../error-request-interceptor';

export class MyFeesEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  public page(page: number | undefined = undefined): Observable<PaginatedResponse<Fee>> {
    const defaultProperties = [new SortingProperty('month', SortingDirection.Descending)];

    let params = new HttpParams();
    if (page) {
      params = params.append('page', page);
    }

    defaultProperties.forEach((property) => params = params.append('sort', `${String(property.property)}|${property.direction}`));

    return this.http.get<PaginatedResponse<Fee>>(`${this.apiUrl}/user/fee`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

}