import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { Setting } from '@app/settings/models/setting';
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
