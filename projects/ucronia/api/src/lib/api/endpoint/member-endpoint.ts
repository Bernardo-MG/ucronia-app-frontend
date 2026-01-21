import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { Member } from '@ucronia/domain';
import { catchError, Observable } from 'rxjs';
import { ErrorRequestInterceptor } from '../error-request-interceptor';
import { toParam } from '../sorting-param-parser';

export class MemberEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  public page(page: number | undefined = undefined, sort: Sorting, name: string): Observable<PaginatedResponse<Member>> {
    const defaultProperties = [new SortingProperty('firstName'), new SortingProperty('lastName'), new SortingProperty('number')];

    let params = new HttpParams();
    if (page) {
      params = params.append('page', page);
    }

    toParam(sort.properties, defaultProperties)
      .forEach((property) => params = params.append('sort', `${String(property.property)}|${property.direction}`));

    params = params.append('name', name);

    return this.http.get<PaginatedResponse<Member>>(`${this.apiUrl}/member`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

}