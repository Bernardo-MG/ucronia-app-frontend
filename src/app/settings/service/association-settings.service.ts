import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularClient, Client, SimpleResponse } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { Setting } from '../models/setting';

@Injectable({
  providedIn: "root"
})
export class AssociationSettingsService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll(): Observable<Setting[]> {
    return this.getClient()
      .read<SimpleResponse<Setting[]>>()
      .pipe(map(r => r.content));
  }

  public update(code: string, setting: Setting): Observable<Setting> {
    return this.getClient()
      .appendRoute(`/${code}`)
      .update<SimpleResponse<Setting>>(setting)
      .pipe(map(r => r.content));
  }

  private getClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/settings');
  }

}
