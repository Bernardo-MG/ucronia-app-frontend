import { inject, Injectable } from '@angular/core';
import { Page, Sorting, SortingProperty } from '@bernardo-mg/request';
import { Profile, SecurityClient } from '@bernardo-mg/security';
import { FeeCreation, FeeUpdate, UcroniaClient } from '@ucronia/api';
import { Fee, FeePayments, Member, MemberStatus } from '@ucronia/domain';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class FeeService {

  private readonly securityClient = inject(SecurityClient);

  private readonly ucroniaClient = inject(UcroniaClient);

  public create(data: FeeCreation): Observable<FeePayments> {
    return this.ucroniaClient.fee.create(data);
  }

  public pay(data: FeePayments): Observable<FeePayments> {
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

  public getMembers(page: number, active: MemberStatus): Observable<Page<Member>> {
    const sorting = new Sorting(
      [
        new SortingProperty('firstName'),
        new SortingProperty('lastName'),
        new SortingProperty('number')
      ]
    );

    return this.ucroniaClient.memberProfile.page(page, undefined, sorting, active, undefined);
  }

  public getOneProfile(id: number): Observable<Profile> {
    return this.securityClient.profile.get(id);
  }

}
