import { Injectable } from '@angular/core';
import { Setting } from '@app/settings/models/setting';
import { AngularCrudClientProvider, CrudClient, SimpleResponse } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityCalendarService {

  constructor(
    private clientProvider: AngularCrudClientProvider
  ) { }

  public getCalendarCode(): Observable<string> {
    return this.getClient()
      .appendRoute('/social.teamup.id')
      .read<SimpleResponse<Setting>>()
      .pipe(map(r => r.content.value));
  }

  private getClient(): CrudClient {
    return this.clientProvider.url(environment.apiUrl + '/settings');
  }

}
