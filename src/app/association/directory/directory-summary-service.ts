import { inject, Injectable } from '@angular/core';
import { UcroniaClient } from '@ucronia/api';
import { forkJoin, map, Observable } from 'rxjs';
import { DirectorySummary } from './model/directory-summary';

@Injectable({
  providedIn: 'root',
})
export class DirectorySummaryService {

  private readonly ucroniaClient = inject(UcroniaClient);

  public getSummary(): Observable<DirectorySummary> {
    return forkJoin({
      members: this.ucroniaClient.member.count(),
      guests: this.ucroniaClient.guest.page(undefined, 0),
      sponsors: this.ucroniaClient.sponsor.page(undefined, 0)
    })
      .pipe(
        map((r) => {
          return {
            members: r.members.active,
            guests: r.guests.totalElements,
            sponsors: r.sponsors.totalElements
          }
        })
      )
  }

}
