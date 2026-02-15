import { Injectable, inject } from '@angular/core';
import { UcroniaClient } from '@ucronia/api';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrontpageService {

  private readonly ucroniaClient = inject(UcroniaClient);

  public getCalendar(): Observable<string> {
    return this.ucroniaClient.setting.public.get()
      .pipe(map(s => s.calendar));
  }

  public getMap(): Observable<string> {
    return this.ucroniaClient.setting.public.get()
      .pipe(map(s => s.map));
  }

  public getInstagramUrl(): string {
    return "https://www.instagram.com/arucronia/";
  }

  public getEmailUrl(): string {
    return "mailto:contacto@arucronia.com";
  }

}
