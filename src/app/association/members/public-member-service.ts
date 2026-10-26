import { inject, Injectable } from '@angular/core';
import { Page, Sorting, SortingProperty } from '@bernardo-mg/request';
import { MemberCount, mergeProperties, UcroniaClient } from '@ucronia/api';
import { PublicMember } from '@ucronia/domain';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicMemberService {

  private readonly ucroniaClient = inject(UcroniaClient);

  private readonly defaultSorting = [
    new SortingProperty('name.firstName'),
    new SortingProperty('name.lastName'),
    new SortingProperty('memberNumber')
  ];

  public getAll(page: number | undefined = undefined, sort: Sorting, name: string): Observable<Page<PublicMember>> {
    const sorting = new Sorting(mergeProperties(sort.properties, this.defaultSorting));
    return this.ucroniaClient.member.page(page, undefined, sorting, name);
  }

  public searchMembers(query: string): Observable<PublicMember[]> {
    const sorting = new Sorting(this.defaultSorting);
    return this.ucroniaClient.member.page(undefined, 10, sorting, query.trim())
      .pipe(map(page => page.content));
  }

  public getSummary(): Observable<MemberCount> {
    return this.ucroniaClient.member.count();
  }

}
