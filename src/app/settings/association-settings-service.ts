import { Injectable, inject } from '@angular/core';
import { UcroniaClient } from '@ucronia/api';
import { Setting } from '@ucronia/domain';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class AssociationSettingsService {

  private readonly ucroniaClient = inject(UcroniaClient);

  public getEmail(): Observable<string> {
    return this.ucroniaClient.setting.get("contact.email")
      .pipe(map(setting => setting.value));
  }

  public getInstagram(): Observable<string> {
    return this.ucroniaClient.setting.get("contact.instagram")
      .pipe(map(setting => setting.value));
  }

  public getMap(): Observable<string> {
    return this.ucroniaClient.setting.get("contact.googleMap")
      .pipe(map(setting => setting.value));
  }

  public getCalendar(): Observable<string> {
    return this.ucroniaClient.setting.get("contact.teamup")
      .pipe(map(setting => setting.value));
  }

  public updateInstagram(instagram: string): Observable<Setting> {
    return this.ucroniaClient.setting.update("contact.instagram", { value: instagram });
  }

  public updateEmail(email: string): Observable<Setting> {
    return this.ucroniaClient.setting.update("contact.email", { value: email });
  }

  public updateMap(mapId: string): Observable<Setting> {
    return this.ucroniaClient.setting.update("contact.googleMap", { value: mapId });
  }

  public updateCalendar(calendarId: string): Observable<Setting> {
    return this.ucroniaClient.setting.update("contact.teamup", { value: calendarId });
  }

}
