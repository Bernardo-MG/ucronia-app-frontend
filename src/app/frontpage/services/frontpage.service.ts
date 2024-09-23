import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { PublicSettings } from '../../settings/models/public-settings';

@Injectable({
  providedIn: 'root'
})
export class FrontpageService {

  constructor(
    private http: HttpClient
  ) { }

  public getCalendarCode(): Observable<string> {
    return this.getConfigClient()
      .read<SimpleResponse<PublicSettings>>()
      .pipe(map(r => r.content.calendarCode));
  }

  public getMapCode(): Observable<string> {
    return this.getConfigClient()
      .read<SimpleResponse<PublicSettings>>()
      .pipe(map(r => r.content.mapCode));
  }

  public getInstagramUrl(): string {
    return "https://www.instagram.com/arucronia/";
  }

  public getEmailUrl(): string {
    return "mailto:contacto@arucronia.com";
  }

  private getConfigClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/settings/public');
  }

}
