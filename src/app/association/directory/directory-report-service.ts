import { inject, Injectable } from '@angular/core';
import { UcroniaClient } from '@ucronia/api';
import { forkJoin, map, Observable } from 'rxjs';
import { DirectoryReport } from './model/directory-status-report';
import { MemberStatus } from '@ucronia/domain';

@Injectable({
  providedIn: 'root',
})
export class DirectoryReportService {

  private readonly ucroniaClient = inject(UcroniaClient);

  public getReport(): Observable<DirectoryReport> {
    return forkJoin({
      members: this.ucroniaClient.memberProfile.page(undefined, 0, undefined, MemberStatus.Active),
      guests: this.ucroniaClient.guest.page(undefined, 0),
      sponsors: this.ucroniaClient.sponsor.page(undefined, 0)
    })
      .pipe(
        map((r) => {
          return {
            members: r.members.totalElements,
            guests: r.guests.totalElements,
            sponsors: r.sponsors.totalElements
          }
        })
      )
  }

}
