import { Injectable, inject } from '@angular/core';
import { Page } from '@bernardo-mg/request';
import { UcroniaClient } from '@ucronia/api';
import { Activity, PublicSettings } from '@ucronia/domain';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrontpageService {

  private readonly ucroniaClient = inject(UcroniaClient);

  public getSettings(): Observable<PublicSettings> {
    return this.ucroniaClient.setting.public.get();
  }

  public getActivities(): Observable<Page<Activity>> {
    return this.ucroniaClient.activity.page();
  }

}
