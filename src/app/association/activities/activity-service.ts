import { inject, Injectable } from '@angular/core';
import { Page } from '@bernardo-mg/request';
import { UcroniaClient } from '@ucronia/api';
import { Activity } from '@ucronia/domain';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {

  private readonly ucroniaClient = inject(UcroniaClient);

  public create(data: Activity): Observable<Activity> {
    return this.ucroniaClient.activity.create(data);
  }

  public update(data: Activity): Observable<Activity> {
    return this.ucroniaClient.activity.update(data.number, data);
  }

  public delete(index: number): Observable<Activity> {
    return this.ucroniaClient.activity.delete(index);
  }

  public getAll(page: number | undefined = undefined): Observable<Page<Activity>> {
    return this.ucroniaClient.activity
      .page(page, undefined, undefined);
  }

  public getOne(index: number): Observable<Activity> {
    return this.ucroniaClient.activity.get(index);
  }

}
