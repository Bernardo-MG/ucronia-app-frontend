import { Injectable } from '@angular/core';
import { Setting } from '@app/settings/models/setting';
import { AngularCrudClientProvider, SimpleResponse } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityCalendarService {

  private readonly client;

  constructor(
    clientProvider: AngularCrudClientProvider
  ) {
    this.client = clientProvider.url(environment.apiUrl + '/settings');
  }

  public getCalendarCode(): Observable<string> {
    return this.client
      .appendRoute('/social.teamup.id')
      .read<SimpleResponse<Setting>>()
      .pipe(map(r => r.content.value));
  }

}
