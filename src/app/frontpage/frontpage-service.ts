import { Injectable, inject } from '@angular/core';
import { getAllPages } from '@app/shared/request/get-all-pages';
import { UcroniaClient } from '@ucronia/api';
import { Activity, ContactInfo } from '@ucronia/domain';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrontpageService {

  private readonly ucroniaClient = inject(UcroniaClient);

  public getContactInfo(): Observable<ContactInfo> {
    return this.ucroniaClient.contactInfo.get();
  }

  public getActivities(from: Date | undefined = undefined, to: Date | undefined = undefined): Observable<Activity[]> {
    const endpoint = this.ucroniaClient.activity;
    return getAllPages((page, size) => endpoint.page(page, size, undefined, from, to));
  }

}
