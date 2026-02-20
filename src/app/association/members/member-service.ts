import { inject, Injectable } from '@angular/core';
import { Page, Sorting, SortingProperty } from '@bernardo-mg/request';
import { MemberSummary, mergeProperties, UcroniaClient } from '@ucronia/api';
import { Member } from '@ucronia/domain';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private readonly ucroniaClient = inject(UcroniaClient);

  public getAll(page: number | undefined = undefined, sort: Sorting, name: string): Observable<Page<Member>> {
    const sorting = new Sorting(
      mergeProperties(
        sort.properties,
        [
          new SortingProperty('firstName'),
          new SortingProperty('lastName'),
          new SortingProperty('number')
        ]
      )
    );

    return this.ucroniaClient.member.page(page, undefined, sorting, name);
  }

  public getSummary(): Observable<MemberSummary> {
    return this.ucroniaClient.member.summary();
  }

}
