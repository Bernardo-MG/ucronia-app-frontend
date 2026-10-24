import { TestBed } from '@angular/core/testing';
import { Page } from '@bernardo-mg/request';
import { UcroniaClient } from '@ucronia/api';
import { PublicMember } from '@ucronia/domain';
import { of } from 'rxjs';
import { PublicMemberService } from './public-member-service';

describe('PublicMemberService - assignment options', () => {
  let service: PublicMemberService;

  const endpointMock = jasmine.createSpyObj<UcroniaClient['member']>('PublicMemberEndpoint', ['page']);

  beforeEach(() => {
    endpointMock.page.calls.reset();
    TestBed.configureTestingModule({ providers: [{ provide: UcroniaClient, useValue: { member: endpointMock } }] });
    service = TestBed.inject(PublicMemberService);
  });

  it('loads every public member page and retains profile numbers independently of member numbers', () => {
    const first = Object.assign(new PublicMember(), { number: 12, memberNumber: 37 });
    const second = Object.assign(new PublicMember(), { number: 15, memberNumber: 42 });
    endpointMock.page.and.returnValues(
      of(Object.assign(new Page<PublicMember>(), { content: [first], page: 1, last: false })),
      of(Object.assign(new Page<PublicMember>(), { content: [second], page: 2, last: true }))
    );
    let result: PublicMember[] = [];

    service.getAllAvailable().subscribe(members => (result = members));

    expect(result).toEqual([first, second]);
    expect(endpointMock.page.calls.allArgs().map(args => args.slice(0, 2))).toEqual([[1, 100], [2, 100]]);
  });
});
