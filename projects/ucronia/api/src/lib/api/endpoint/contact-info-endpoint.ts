import { HttpClient } from '@angular/common/http';
import { ErrorRequestInterceptor, SimpleResponse } from '@bernardo-mg/request';
import { ContactInfo } from '@ucronia/domain';
import { catchError, map, Observable } from 'rxjs';

export class ContactInfoEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  public get(): Observable<ContactInfo> {
    return this.http.get<SimpleResponse<ContactInfo>>(`${this.apiUrl}/contact`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

}
