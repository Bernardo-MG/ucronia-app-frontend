import { Injectable, inject } from '@angular/core';
import { SettingUpdate, UcroniaClient } from '@ucronia/api';
import { Setting } from '@ucronia/domain';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class AssociationSettingsService {

  private readonly ucroniaClient = inject(UcroniaClient);

  public getAll(): Observable<Setting[]> {
    return this.ucroniaClient.setting.getAll();
  }

  public updateFeeAmount(feeAmount: string): Observable<Setting> {
    return this.ucroniaClient.setting.update("fee.amount", { value: feeAmount });
  }

  public updateMap(mapId: string): Observable<Setting> {
    return this.ucroniaClient.setting.update("social.googleMap.id", { value: mapId });
  }

  public updateCalendar(calendarId: string): Observable<Setting> {
    return this.ucroniaClient.setting.update("social.teamup.id", { value: calendarId });
  }

  public updateInstagram(instagram: string): Observable<Setting> {
    return this.ucroniaClient.setting.update("social.instagram", { value: instagram });
  }

}
