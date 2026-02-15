import { Injectable, inject } from '@angular/core';
import { UcroniaClient } from '@ucronia/api';
import { PublicSettings } from '@ucronia/domain';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrontpageService {

  private readonly ucroniaClient = inject(UcroniaClient);

  public getSettings(): Observable<PublicSettings> {
    return this.ucroniaClient.setting.public.get();
  }

}
