import { HttpClient, HttpParams } from '@angular/common/http';
import { ErrorRequestInterceptor, Page, PaginatedResponse, Sorting } from '@bernardo-mg/request';
import { Fee } from '@ucronia/domain';
import { catchError, Observable } from 'rxjs';

export class MyFeesEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  public page(
    page: number | undefined = undefined,
    size: number | undefined = undefined,
    sort: Sorting | undefined = undefined
  ): Observable<Page<Fee>> {
    let params = new HttpParams();
    if (page) {
      params = params.append('page', page);
    }
    if (size) {
      params = params.append('size', size);
    }

    sort?.properties
      .forEach((property) => params = params.append('sort', `${String(property.property)}|${property.direction}`));

    return this.http.get<PaginatedResponse<Fee>>(`${this.apiUrl}/user/fee`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

}