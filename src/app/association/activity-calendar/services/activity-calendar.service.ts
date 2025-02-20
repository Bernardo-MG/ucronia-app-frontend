import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Setting } from '@app/settings/models/setting';
import { AngularClient, Client, SimpleResponse } from '@bernardo-mg/request';
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

  private getClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/settings');
  }

}
