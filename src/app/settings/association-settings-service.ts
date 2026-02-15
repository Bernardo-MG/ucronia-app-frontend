import { Injectable, inject } from '@angular/core';
import { UcroniaClient } from '@ucronia/api';
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

  public getMap(): Observable<Setting> {
    return this.ucroniaClient.setting.get("social.googleMap.id");
  }

  public getCalendar(): Observable<Setting> {
    return this.ucroniaClient.setting.get("social.teamup.id");
  }

  public getInstagram(): Observable<Setting> {
    return this.ucroniaClient.setting.get("social.instagram");
  }

  public updateFeeAmount(feeAmount: string): Observable<Setting> {
    return this.ucroniaClient.setting.update("fee.amount", { value: feeAmount });
  }

  public updateInstagram(instagram: string): Observable<Setting> {
    return this.ucroniaClient.setting.update("social.instagram", { value: instagram });
  }

  public updateEmail(email: string): Observable<Setting> {
    return this.ucroniaClient.setting.update("social.email", { value: email });
  }

  public updateMap(mapId: string): Observable<Setting> {
    return this.ucroniaClient.setting.update("social.googleMap.id", { value: mapId });
  }

  public updateCalendar(calendarId: string): Observable<Setting> {
    return this.ucroniaClient.setting.update("social.teamup.id", { value: calendarId });
  }

}
