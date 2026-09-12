import { Injectable, inject } from '@angular/core';
import { getAllPages } from '@app/shared/request/get-all-pages';
import { UcroniaClient } from '@ucronia/api';
import { Activity, PublicSettings } from '@ucronia/domain';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrontpageService {

  private readonly ucroniaClient = inject(UcroniaClient);

  public getSettings(): Observable<PublicSettings> {
    return this.ucroniaClient.setting.public.get();
  }

  public getActivities(from: Date | undefined = undefined, to: Date | undefined = undefined): Observable<Activity[]> {
    return getAllPages((page, size) => this.ucroniaClient.activity.page(page, size, undefined, from, to));
  }

}
