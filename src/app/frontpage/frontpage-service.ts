import { Injectable, inject } from '@angular/core';
import { UcroniaClient } from '@ucronia/api';
import { Activity, PublicSettings } from '@ucronia/domain';
import { EMPTY, expand, Observable, reduce } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrontpageService {

  private readonly ucroniaClient = inject(UcroniaClient);

  public getSettings(): Observable<PublicSettings> {
    return this.ucroniaClient.setting.public.get();
  }

  public getActivities(from: Date | undefined = undefined, to: Date | undefined = undefined): Observable<Activity[]> {
    const pageSize = 100;
    const endpoint = this.ucroniaClient.activity;
    return endpoint.page(1, pageSize, undefined, from, to).pipe(
      expand(page => page.last ? EMPTY : endpoint.page(page.page + 1, pageSize, undefined, from, to)),
      reduce((items, page) => items.concat(page.content), [] as Activity[])
    );
  }

}
