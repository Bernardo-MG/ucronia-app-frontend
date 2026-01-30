import { HttpClient, HttpParams } from '@angular/common/http';
import { ResourcePermission } from '@bernardo-mg/authentication';
import { PaginatedResponse, Sorting } from '@bernardo-mg/request';
import { catchError, Observable } from 'rxjs';
import { ErrorRequestInterceptor } from '../error-request-interceptor';

export class PermissionEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  public page(
    page: number | undefined = undefined,
    size: number | undefined = undefined,
    sort: Sorting | undefined = undefined
  ): Observable<PaginatedResponse<ResourcePermission>> {
    let params = new HttpParams();
    if (page) {
      params = params.append('page', page);
    }
    if (size) {
      params = params.append('size', size);
    }

    sort?.properties
      .forEach((property) => params = params.append('sort', `${String(property.property)}|${property.direction}`));

    params = params.append('status', status);

    return this.http.get<PaginatedResponse<ResourcePermission>>(`${this.apiUrl}/security/permission`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

}
