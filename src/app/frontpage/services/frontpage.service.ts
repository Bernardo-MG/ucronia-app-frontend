import { Injectable } from '@angular/core';
import { AngularCrudClientProvider, SimpleResponse } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { PublicSettings } from '../../settings/models/public-settings';

@Injectable({
  providedIn: 'root'
})
export class FrontpageService {

  private client;

  constructor(
    private clientProvider: AngularCrudClientProvider
  ) {
    this.client = this.clientProvider.url(environment.apiUrl + '/settings/public');
  }

  public getCalendarCode(): Observable<string> {
    return this.client
      .read<SimpleResponse<PublicSettings>>()
      .pipe(map(r => r.content.calendarCode));
  }

  public getMapCode(): Observable<string> {
    return this.client
      .read<SimpleResponse<PublicSettings>>()
      .pipe(map(r => r.content.mapCode));
  }

  public getInstagramUrl(): string {
    return "https://www.instagram.com/arucronia/";
  }

  public getEmailUrl(): string {
    return "mailto:contacto@arucronia.com";
  }

}
