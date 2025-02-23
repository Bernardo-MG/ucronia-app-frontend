import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Setting } from '@app/settings/models/setting';
import { AngularCrudClient, CrudClient, SimpleResponse } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityCalendarService {

  constructor(
    private http: HttpClient
  ) { }

  public getCalendarCode(): Observable<string> {
    return this.getClient()
      .appendRoute('/social.teamup.id')
      .read<SimpleResponse<Setting>>()
      .pipe(map(r => r.content.value));
  }

  private getClient(): CrudClient {
    return new AngularCrudClient(this.http, environment.apiUrl + '/settings');
  }

}
