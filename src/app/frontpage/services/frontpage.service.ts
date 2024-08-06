import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { Menu } from '@app/shared/menu/models/menu';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { PublicConfiguration } from '../models/public-configuration';

@Injectable({
  providedIn: 'root'
})
export class FrontpageService {

  constructor(
    private http: HttpClient
  ) { }

  public getCalendarCode(): Observable<string> {
    return this.getConfigClient()
      .read<SimpleResponse<PublicConfiguration>>()
      .pipe(map(r => r.content.calendarCode));
  }

  public getMapCode(): Observable<string> {
    return this.getConfigClient()
      .read<SimpleResponse<PublicConfiguration>>()
      .pipe(map(r => r.content.mapCode));
  }

  private getConfigClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/configuration/public');
  }

}
