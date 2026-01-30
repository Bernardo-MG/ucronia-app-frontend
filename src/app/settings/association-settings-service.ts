import { Injectable, inject } from '@angular/core';
import { SettingUpdate, UcroniaClient } from '@ucronia/api';
import { Setting } from '@ucronia/domain';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class AssociationSettingsService {

  private readonly ucroniaClient = inject(UcroniaClient);
x
  public getAll(): Observable<Setting[]> {
    return this.ucroniaClient.setting.getAll();
  }

  public update(code: string, setting: SettingUpdate): Observable<Setting> {
    return this.ucroniaClient.setting.update(code,setting);
  }

}
