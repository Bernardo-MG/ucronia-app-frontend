import { inject, Injectable } from '@angular/core';
import { Page, Sorting, SortingProperty } from '@bernardo-mg/request';
import { MemberCount, mergeProperties, UcroniaClient } from '@ucronia/api';
import { PublicMember } from '@ucronia/domain';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private readonly ucroniaClient = inject(UcroniaClient);

  public getAll(
    page: number | undefined = undefined,
    sort: Sorting,
    name: string
  ): Observable<Page<PublicMember>> {
    const sorting = new Sorting(
      mergeProperties(
        sort.properties,
        [
          new SortingProperty('name.firstName'),
          new SortingProperty('name.lastName'),
          new SortingProperty('number')
        ]
      )
    );

    return this.ucroniaClient.member.page(page, undefined, sorting, name);
  }

  public getSummary(): Observable<MemberCount> {
    return this.ucroniaClient.member.count();
  }

}
