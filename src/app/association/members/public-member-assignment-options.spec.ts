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

  it('searches the first ten public members by name and retains their profile numbers', () => {
    const member = Object.assign(new PublicMember(), { number: 12, memberNumber: 37 });
    endpointMock.page.and.returnValue(of(Object.assign(new Page<PublicMember>(), { content: [member] })));
    let result: PublicMember[] = [];

    service.searchMembers(' Ana ').subscribe(members => (result = members));

    expect(result).toEqual([member]);
    expect(endpointMock.page).toHaveBeenCalledTimes(1);
    const [page, size, sorting, name] = endpointMock.page.calls.mostRecent().args;
    expect(page).toBeUndefined();
    expect(size).toBe(10);
    expect(name).toBe('Ana');
    expect(sorting?.properties.map(property => property.property)).toEqual(['name.firstName', 'name.lastName', 'memberNumber']);
  });
});
