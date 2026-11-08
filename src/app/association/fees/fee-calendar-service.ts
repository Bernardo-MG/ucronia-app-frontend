import { inject, Injectable } from '@angular/core';
import { getAllPages } from '@app/shared/request/get-all-pages';
import { Sorting, SortingProperty } from '@bernardo-mg/request';
import { UcroniaClient } from '@ucronia/api';
import { Fee, Member, MemberStatus, YearsRange } from '@ucronia/domain';
import { endOfYear, startOfYear } from 'date-fns';
import { forkJoin, map, Observable } from 'rxjs';
import { MemberFees } from './domain/member-fees';

@Injectable({
  providedIn: "root"
})
export class FeeCalendarService {

  private readonly ucroniaClient = inject(UcroniaClient);

  // TODO: Add backend fee filtering by member status before restoring the status selector.
  public getCalendar(year: number): Observable<MemberFees[]> {
    const sorting = new Sorting(
      [
        new SortingProperty('member.name.firstName'),
        new SortingProperty('member.name.lastName'),
        new SortingProperty('month')
      ]
    );

    const date = new Date(year, 0, 1);

    const feeEndpoint = this.ucroniaClient.fee;
    const fees = getAllPages((page, size) => feeEndpoint.page(page, size, sorting, startOfYear(date), endOfYear(date)));
    const memberEndpoint = this.ucroniaClient.memberProfile;
    const members = getAllPages((page, size) => memberEndpoint.page(page, size, undefined, MemberStatus.All));

    return forkJoin({ fees, members })
      .pipe(
        map(result => this.toMemberFees(result.fees, result.members))
      );
  }

  private toMemberFees(fees: Fee[], members: Member[]): MemberFees[] {
    const memberFees = new Map<number, MemberFees>();
    const membersByNumber = new Map(members.map(member => [member.number, member]));

    fees
      .forEach(fee => {
        let calendarEntry = memberFees.get(fee.member.number);
        if (!calendarEntry) {
          const member = membersByNumber.get(fee.member.number);
          calendarEntry = {
            member: {
              number: fee.member.number,
              name: member?.name ?? fee.member.name,
              active: member?.active
            },
            fees: []
          };
          memberFees.set(fee.member.number, calendarEntry);
        }

        calendarEntry.fees.push({
          month: fee.month,
          paid: fee.paid
        });
      });

    return Array.from(memberFees.values());
  }


  public getRange(): Observable<YearsRange> {
    return this.ucroniaClient.fee.range();
  }

}
