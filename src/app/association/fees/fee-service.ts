import { inject, Injectable } from '@angular/core';
import { Page, Sorting, SortingProperty } from '@bernardo-mg/request';
import { FeeCreation, FeeUpdate, UcroniaClient } from '@ucronia/api';
import { Fee, FeePayments, Member, MemberStatus, Profile } from '@ucronia/domain';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class FeeService {

  private readonly ucroniaClient = inject(UcroniaClient);

  public create(data: FeeCreation): Observable<Fee> {
    return this.ucroniaClient.fee.create(data);
  }

  public pay(data: FeePayments): Observable<Fee[]> {
    return this.ucroniaClient.fee.pay(data);
  }

  public update(member: number, month: Date, data: FeeUpdate): Observable<Fee> {
    return this.ucroniaClient.fee.update(member, month, data);
  }

  public delete(member: number, month: Date): Observable<Fee> {
    return this.ucroniaClient.fee.delete(member, month);
  }

  public getOne(member: number, month: Date): Observable<Fee> {
    return this.ucroniaClient.fee.get(member, month);
  }

  public searchMembers(query: string, active: MemberStatus = MemberStatus.Active): Observable<Member[]> {
    const sorting = new Sorting(
      [
        new SortingProperty('name.firstName'),
        new SortingProperty('name.lastName'),
        new SortingProperty('number')
      ]
    );

    return this.ucroniaClient.memberProfile.page(undefined, 10, sorting, active, query)
      .pipe(map(page => page.content as Member[]));
  }

  public getOneProfile(id: number): Observable<Profile> {
    return this.ucroniaClient.profile.get(id);
  }

}
