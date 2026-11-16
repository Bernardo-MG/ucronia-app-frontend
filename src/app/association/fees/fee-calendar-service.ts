import { inject, Injectable } from '@angular/core';
import { getAllPages } from '@app/shared/request/get-all-pages';
import { Sorting, SortingProperty } from '@bernardo-mg/request';
import { UcroniaClient } from '@ucronia/api';
import { Fee, MemberStatus, PublicMember } from '@ucronia/domain';
import { endOfMonth, NormalizedInterval, startOfMonth } from 'date-fns';
import { forkJoin, map, Observable } from 'rxjs';
import { MemberFees } from './domain/member-fees';

@Injectable({
  providedIn: "root"
})
export class FeeCalendarService {

  private readonly ucroniaClient = inject(UcroniaClient);

  public getCalendar(period: NormalizedInterval): Observable<MemberFees[]> {
    const sorting = new Sorting(
      [
        new SortingProperty('member.name.firstName'),
        new SortingProperty('member.name.lastName'),
        new SortingProperty('month')
      ]
    );

    const from = startOfMonth(period.start);
    const to = endOfMonth(period.end);

    const feeEndpoint = this.ucroniaClient.fee;
    const fees = getAllPages((page, size) => feeEndpoint.page(page, size, sorting, from, to));
    const memberEndpoint = this.ucroniaClient.member;
    const members = getAllPages((page, size) => memberEndpoint.page(page, size, undefined, undefined, MemberStatus.All));

    return forkJoin({ fees, members })
      .pipe(
        map(result => this.toMemberFees(result.fees, result.members))
      );
  }

  private toMemberFees(fees: Fee[], members: PublicMember[]): MemberFees[] {
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

}
