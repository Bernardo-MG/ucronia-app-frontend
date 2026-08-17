import { HttpClient, HttpParams } from '@angular/common/http';
import { ErrorRequestInterceptor, Page, PaginatedResponse, SimpleResponse, Sorting } from '@bernardo-mg/request';
import { Member, MemberStatus } from '@ucronia/domain';
import { catchError, map, Observable } from 'rxjs';
import { MemberPatch } from '../../members/member-patch';

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
    active: MemberStatus = MemberStatus.All,
    name: string | undefined = undefined
  ): Observable<Page<Member>> {
    let params = new HttpParams();
    if (page) {
      params = params.append('page', page);
    }
    if (size) {
      params = params.append('size', size);
    }

    const status = active ? active.toString().toUpperCase() : '';

    sort?.properties
      .forEach((property) => params = params.append('sort', `${String(property.property)}|${property.direction}`));

    params = params.append('status', status);
    if (name) {
      params = params.append('name', name);
    }

    return this.http.get<PaginatedResponse<Member>>(`${this.apiUrl}/profile/member`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

  public get(
    number: number
  ): Observable<Member> {
    return this.http.get<SimpleResponse<Member>>(`${this.apiUrl}/profile/member/${number}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public patch(
    number: number,
    data: MemberPatch
  ): Observable<Member> {
    return this.http.patch<SimpleResponse<Member>>(`${this.apiUrl}/profile/member/${number}`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public delete(
    number: number
  ): Observable<Member> {
    return this.http.delete<SimpleResponse<Member>>(`${this.apiUrl}/profile/member/${number}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

}