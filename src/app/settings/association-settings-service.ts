import { inject, Injectable } from '@angular/core';
import { UcroniaClient } from '@ucronia/api';
import { Setting } from '@ucronia/domain';
import { MessageService } from 'primeng/api';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class AssociationSettingsService {

  private readonly messageService = inject(MessageService);

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
    return this.ucroniaClient.setting.update("contact.instagram", { value: instagram }).pipe(
      tap(() => {
        this.messageService.add({
          severity: 'info',
          summary: 'Actualizado',
          detail: 'Instagram actualizado',
          life: 3000
        });
      })
    );
  }

  public updateEmail(email: string): Observable<Setting> {
    return this.ucroniaClient.setting.update("contact.email", { value: email }).pipe(
      tap(() => {
        this.messageService.add({
          severity: 'info',
          summary: 'Actualizado',
          detail: 'Correo actualizado',
          life: 3000
        });
      })
    );
  }

  public updateMap(mapId: string): Observable<Setting> {
    return this.ucroniaClient.setting.update("contact.googleMap", { value: mapId }).pipe(
      tap(() => {
        this.messageService.add({
          severity: 'info',
          summary: 'Actualizado',
          detail: 'Google Maps actualizado',
          life: 3000
        });
      })
    );
  }

  public updateCalendar(calendarId: string): Observable<Setting> {
    return this.ucroniaClient.setting.update("contact.teamup", { value: calendarId }).pipe(
      tap(() => {
        this.messageService.add({
          severity: 'info',
          summary: 'Actualizado',
          detail: 'Teamup actualizado',
          life: 3000
        });
      })
    );
  }

}
