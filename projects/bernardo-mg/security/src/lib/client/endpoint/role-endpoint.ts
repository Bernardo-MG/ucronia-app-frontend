import { HttpClient, HttpParams } from '@angular/common/http';
import { Role } from '@bernardo-mg/authentication';
import { PaginatedResponse, SimpleResponse, Sorting } from '@bernardo-mg/request';
import { catchError, map, Observable } from 'rxjs';
import { RoleChange } from '../../request/role-change';
import { RoleCreation } from '../../request/role-creation';
import { ErrorRequestInterceptor } from '../error-request-interceptor';

export class RoleEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  public page(
    page: number | undefined = undefined,
    size: number | undefined = undefined,
    sort: Sorting | undefined = undefined
  ): Observable<PaginatedResponse<Role>> {
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

    return this.http.get<PaginatedResponse<Role>>(`${this.apiUrl}/security/role`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

  public get(
    name: string
  ): Observable<Role> {
    return this.http.get<SimpleResponse<Role>>(`${this.apiUrl}/security/role/${name}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public create(
    data: RoleCreation
  ): Observable<Role> {
    return this.http.post<SimpleResponse<Role>>(`${this.apiUrl}/security/role`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public update(
    name: string,
    data: RoleChange
  ): Observable<Role> {
    return this.http.patch<SimpleResponse<Role>>(`${this.apiUrl}/security/role/${name}`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public delete(
    name: string
  ): Observable<Role> {
    return this.http.delete<SimpleResponse<Role>>(`${this.apiUrl}/security/role/${name}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

}
