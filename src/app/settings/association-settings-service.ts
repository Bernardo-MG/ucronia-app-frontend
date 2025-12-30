import { Injectable, inject } from '@angular/core';
import { AngularCrudClientProvider, SimpleResponse } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { Setting } from './models/setting';
import { SettingChange } from './models/setting-change';

@Injectable({
  providedIn: "root"
})
export class AssociationSettingsService {

  private readonly client;

  constructor() {
    const clientProvider = inject(AngularCrudClientProvider);

    this.client = clientProvider.url(environment.apiUrl + '/settings');
  }

  public getAll(): Observable<Setting[]> {
    return this.client
      .read<SimpleResponse<Setting[]>>()
      .pipe(map(r => r.content));
  }

  public update(code: string, setting: SettingChange): Observable<Setting> {
    return this.client
      .appendRoute(`/${code}`)
      .update<SimpleResponse<Setting>>(setting)
      .pipe(map(r => r.content));
  }

}
