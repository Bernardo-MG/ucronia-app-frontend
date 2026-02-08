import { Injectable, inject } from '@angular/core';
import { UcroniaClient } from '@ucronia/api';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrontpageService {

  private readonly ucroniaClient = inject(UcroniaClient);

  public getCalendarCode(): Observable<string> {
    return this.ucroniaClient.setting.public.get()
      .pipe(map(s => s.calendarCode));
  }

  public getMapCode(): Observable<string> {
    return this.ucroniaClient.setting.public.get()
      .pipe(map(s => s.mapCode));
  }

  public getInstagramUrl(): string {
    return "https://www.instagram.com/arucronia/";
  }

  public getEmailUrl(): string {
    return "mailto:contacto@arucronia.com";
  }

}
