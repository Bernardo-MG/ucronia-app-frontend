import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable()
export class FrontpageService {

  constructor(
    private http: HttpClient
  ) { }

  public getCalendarCode(): Observable<string> {
    return this.getClient()
      .appendRoute('/calendar-id')
      .read<SimpleResponse<string>>()
      .pipe(map(r => r.content));
  }

  private getClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/configuration');
  }

}
