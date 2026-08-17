import { inject, Injectable } from '@angular/core';
import { getAllPages } from '@app/shared/request/get-all-pages';
import { Sorting, SortingProperty } from '@bernardo-mg/request';
import { UcroniaClient } from '@ucronia/api';
import { Fee, MemberStatus, YearsRange } from '@ucronia/domain';
import { endOfYear, startOfYear } from 'date-fns';
import { Member } from 'projects/ucronia/domain/src/public-api';
import { forkJoin, map, Observable } from 'rxjs';
import { MemberFees } from './domain/member-fees';

@Injectable({
  providedIn: "root"
})
export class FeeCalendarService {

  private readonly ucroniaClient = inject(UcroniaClient);

  public getCalendar(year: number, status: MemberStatus): Observable<MemberFees[]> {
    const sorting = new Sorting(
      [
        new SortingProperty('member.name.firstName'),
        new SortingProperty('member.name.lastName')
      ]
    );

    const date = new Date(year, 0, 1);

    const fees = getAllPages((page, size) => this.ucroniaClient.fee
      .page(page, size, sorting, startOfYear(date), endOfYear(date)));
    const members = getAllPages((page, size) => this.ucroniaClient.memberProfile
      .page(page, size, undefined, status));

    return forkJoin({ fees, members })
      .pipe(
        map(result => this.toMemberFees(result.fees, result.members))
      );
  }

  private toMemberFees(fees: Fee[], members: Member[]): MemberFees[] {
    const memberFees = new Map<number, MemberFees>();
    const membersByNumber = new Map(members.map(member => [member.number, member]));

    fees
      .filter(fee => membersByNumber.has(fee.member.number))
      .forEach(fee => {
        let calendarEntry = memberFees.get(fee.member.number);
        if (!calendarEntry) {
          const member = membersByNumber.get(fee.member.number) as Member;
          calendarEntry = {
            member: {
              number: member.number,
              name: member.name,
              active: member.active
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
