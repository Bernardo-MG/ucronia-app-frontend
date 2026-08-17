import { TestBed } from '@angular/core/testing';
import { Page } from '@bernardo-mg/request';
import { UcroniaClient } from '@ucronia/api';
import { Fee, Member, MemberStatus } from '@ucronia/domain';
import { of } from 'rxjs';
import { FeeCalendarService } from './fee-calendar-service';

describe('FeeCalendarService', () => {
  let service: FeeCalendarService;

  const mockUcroniaClient = {
    fee: {
      page: jasmine.createSpy(),
      range: jasmine.createSpy().and.returnValue(of({}))
    },
    memberProfile: {
      page: jasmine.createSpy()
    }
  };

  beforeEach(() => {
    mockUcroniaClient.fee.page.calls.reset();
    mockUcroniaClient.memberProfile.page.calls.reset();
    TestBed.configureTestingModule({
      providers: [
        { provide: UcroniaClient, useValue: mockUcroniaClient }
      ]
    });
    service = TestBed.inject(FeeCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should read all fee pages for the year and group them by member', () => {
    const firstFee = createFee(1, new Date(2025, 0, 1), false);
    const secondFee = createFee(1, new Date(2025, 1, 1), true);
    const inactiveFee = createFee(2, new Date(2025, 0, 1), true);

    mockUcroniaClient.fee.page.and.callFake((page: number) => {
      const response = new Page<Fee>();
      response.page = page;
      response.last = page === 2;
      response.content = page === 1 ? [firstFee, inactiveFee] : [secondFee];
      return of(response);
    });
    mockUcroniaClient.memberProfile.page.and.returnValue(of(createPage([
      createMember(1, true),
      createMember(2, false)
    ])));

    service.getCalendar(2025, MemberStatus.All).subscribe(calendar => {
      expect(calendar.length).toBe(2);
      expect(calendar[0].member.number).toBe(1);
      expect(calendar[0].member.active).toBeTrue();
      expect(calendar[0].fees).toEqual([
        { month: firstFee.month, paid: false },
        { month: secondFee.month, paid: true }
      ]);
      expect(calendar[1].member.number).toBe(2);
    });

    expect(mockUcroniaClient.fee.page).toHaveBeenCalledTimes(2);
    expect(mockUcroniaClient.fee.page.calls.argsFor(0)[0]).toBe(1);
    expect(mockUcroniaClient.fee.page.calls.argsFor(0)[1]).toBe(100);
    expect(mockUcroniaClient.fee.page.calls.argsFor(1)[0]).toBe(2);
    expect(mockUcroniaClient.memberProfile.page).toHaveBeenCalledOnceWith(
      1, 100, undefined, MemberStatus.All
    );
  });

  it('should filter the calendar by member status', () => {
    const response = new Page<Fee>();
    response.page = 1;
    response.last = true;
    response.content = [
      createFee(1, new Date(2025, 0, 1), true),
      createFee(2, new Date(2025, 0, 1), false)
    ];
    mockUcroniaClient.fee.page.and.returnValue(of(response));
    mockUcroniaClient.memberProfile.page.and.returnValue(of(createPage([
      createMember(1, true)
    ])));

    service.getCalendar(2025, MemberStatus.Active).subscribe(calendar => {
      expect(calendar.map(entry => entry.member.number)).toEqual([1]);
    });

    expect(mockUcroniaClient.memberProfile.page).toHaveBeenCalledOnceWith(
      1, 100, undefined, MemberStatus.Active
    );
  });
});

function createFee(member: number, month: Date, paid: boolean): Fee {
  const fee = new Fee();
  fee.member.number = member;
  fee.member.name.fullName = `Member ${member}`;
  fee.month = month;
  fee.paid = paid;
  return fee;
}

function createMember(number: number, active: boolean): Member {
  const member = new Member();
  member.number = number;
  member.active = active;
  member.name.fullName = `Member ${number}`;
  return member;
}

function createPage<T>(content: T[]): Page<T> {
  const page = new Page<T>();
  page.page = 1;
  page.last = true;
  page.content = content;
  return page;
}
