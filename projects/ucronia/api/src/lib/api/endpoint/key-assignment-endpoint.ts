import { HttpClient, HttpParams } from '@angular/common/http';
import { ErrorRequestInterceptor, Page, PaginatedResponse, SimpleResponse, Sorting } from '@bernardo-mg/request';
import { KeyAssignment } from '@ucronia/domain';
import { catchError, map, Observable } from 'rxjs';
import { KeyAssignmentCreation } from '../../members/key-assignment-creation';
import { KeyAssignmentUpdate } from '../../members/key-assignment-update';

export class KeyAssignmentEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) {}

  public page(
    page: number | undefined = undefined,
    size: number | undefined = undefined,
    sort: Sorting | undefined = undefined
  ): Observable<Page<KeyAssignment>> {
    let params = new HttpParams();
    if (page) {
      params = params.append('page', page);
    }
    if (size) {
      params = params.append('size', size);
    }
    sort?.properties.forEach(
      property => (params = params.append('sort', `${String(property.property)}|${property.direction}`))
    );
    return this.http
      .get<PaginatedResponse<KeyAssignment>>(`${this.apiUrl}/profile/key/assignments`, { params })
      .pipe(catchError(this.errorInterceptor.handle));
  }

  public create(data: KeyAssignmentCreation): Observable<KeyAssignment> {
    return this.http.post<SimpleResponse<KeyAssignment>>(`${this.apiUrl}/profile/key/assignments`, data).pipe(
      catchError(this.errorInterceptor.handle),
      map(response => response.content)
    );
  }

  public update(number: number, data: KeyAssignmentUpdate): Observable<KeyAssignment> {
    return this.http.put<SimpleResponse<KeyAssignment>>(`${this.apiUrl}/profile/key/assignments/${number}`, data).pipe(
      catchError(this.errorInterceptor.handle),
      map(response => response.content)
    );
  }

  public delete(number: number): Observable<KeyAssignment> {
    return this.http.delete<SimpleResponse<KeyAssignment>>(`${this.apiUrl}/profile/key/assignments/${number}`).pipe(
      catchError(this.errorInterceptor.handle),
      map(response => response.content)
    );
  }

}
