import { inject, Injectable } from '@angular/core';
import { PaginatedResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { Profile } from '@bernardo-mg/security';
import { FeeCreation, FeeUpdate, UcroniaClient } from '@ucronia/api';
import { Fee, FeePayment, Member, MemberStatus } from '@ucronia/domain';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class FeeService {

  private readonly ucroniaClient = inject(UcroniaClient);

  public create(data: FeeCreation): Observable<FeePayment> {
    return this.ucroniaClient.fee.create(data);
  }

  public pay(data: FeePayment): Observable<FeePayment> {
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

  public getMembers(page: number, active: MemberStatus): Observable<PaginatedResponse<Member>> {
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
    return this.ucroniaClient.profile.get(id);
  }

}
