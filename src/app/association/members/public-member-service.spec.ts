import { TestBed } from '@angular/core/testing';
import { Page, Sorting } from '@bernardo-mg/request';
import { UcroniaClient } from '@ucronia/api';
import { PublicMember } from '@ucronia/domain';
import { of } from 'rxjs';
import { PublicMemberService } from './public-member-service';

describe('PublicMemberService', () => {
  let service: PublicMemberService;

  let memberEndpointMock: jasmine.SpyObj<UcroniaClient['member']>;

  beforeEach(() => {
    memberEndpointMock = jasmine.createSpyObj<UcroniaClient['member']>('PublicMemberEndpoint', ['page']);
    memberEndpointMock.page.and.returnValue(of(new Page<PublicMember>()));
    TestBed.configureTestingModule({
      providers: [{ provide: UcroniaClient, useValue: { member: memberEndpointMock } }]
    });

    service = TestBed.inject(PublicMemberService);
  });

  it('uses the member number as the stable public-list sort key', () => {
    service.getAll(undefined, new Sorting(), '').subscribe();
    const sorting = memberEndpointMock.page.calls.mostRecent().args[2] as Sorting;

    expect(sorting.properties.map(property => property.property)).toContain('memberNumber');
    expect(sorting.properties.map(property => property.property)).not.toContain('number');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('searches the first ten public members by name and retains their profile numbers', () => {
    const member = Object.assign(new PublicMember(), { number: 12, memberNumber: 37 });
    memberEndpointMock.page.and.returnValue(of(Object.assign(new Page<PublicMember>(), { content: [member] })));
    let result: PublicMember[] = [];

    service.searchMembers(' Ana ').subscribe(members => (result = members));

    expect(result).toEqual([member]);
    expect(memberEndpointMock.page).toHaveBeenCalledTimes(1);
    const [page, size, sorting, name] = memberEndpointMock.page.calls.mostRecent().args;
    expect(page).toBeUndefined();
    expect(size).toBe(10);
    expect(name).toBe('Ana');
    expect(sorting?.properties.map(property => property.property)).toEqual(['name.firstName', 'name.lastName', 'memberNumber']);
  });
});
