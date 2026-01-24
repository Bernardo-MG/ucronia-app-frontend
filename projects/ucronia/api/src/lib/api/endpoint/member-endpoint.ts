import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResponse, Sorting } from '@bernardo-mg/request';
import { Member } from '@ucronia/domain';
import { catchError, Observable } from 'rxjs';
import { ErrorRequestInterceptor } from '../error-request-interceptor';

export class MemberEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  public page(
    page: number | undefined = undefined,
    size: number | undefined = undefined,
    sort: Sorting | undefined = undefined,
    name: string
  ): Observable<PaginatedResponse<Member>> {
    let params = new HttpParams();
    if (page) {
      params = params.append('page', page);
    }
    if (size) {
      params = params.append('size', size);
    }

    sort?.properties
      .forEach((property) => params = params.append('sort', `${String(property.property)}|${property.direction}`));

    params = params.append('name', name);

    return this.http.get<PaginatedResponse<Member>>(`${this.apiUrl}/member`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

}