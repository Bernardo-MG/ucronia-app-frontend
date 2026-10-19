import { TestBed } from '@angular/core/testing';
import { Page } from '@bernardo-mg/request';
import { UcroniaClient } from '@ucronia/api';
import { KeyAssignment } from '@ucronia/domain';
import { of } from 'rxjs';
import { MemberKeyService } from './member-key-service';

describe('MemberKeyService', () => {
  let service: MemberKeyService;

  const keyEndpointMock = jasmine.createSpyObj<UcroniaClient['key']>('KeyEndpoint', ['assignments']);

  beforeEach(() => {
    keyEndpointMock.assignments.calls.reset();
    keyEndpointMock.assignments.and.returnValue(
      of(Object.assign(new Page<KeyAssignment>(), { content: [], page: 1, last: true }))
    );

    TestBed.configureTestingModule({
      providers: [{ provide: UcroniaClient, useValue: { key: keyEndpointMock } }]
    });

    service = TestBed.inject(MemberKeyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should read all pages and retain unassigned keys', () => {
    const assigned: KeyAssignment = {
      number: 1,
      available: true,
      description: 'Principal',
      member: { number: 10, memberNumber: 37, name: 'Ana' }
    };
    const unassigned: KeyAssignment = { number: 2, available: false, description: 'Lateral' };

    keyEndpointMock.assignments.and.returnValues(
      of(Object.assign(new Page<KeyAssignment>(), { content: [assigned], page: 1, last: false })),
      of(Object.assign(new Page<KeyAssignment>(), { content: [unassigned], page: 2, last: true }))
    );
    let result: KeyAssignment[] = [];

    service.getAll().subscribe(data => (result = data));

    expect(result).toEqual([assigned, unassigned]);
    expect(keyEndpointMock.assignments.calls.allArgs().map(args => args[0])).toEqual([1, 2]);
  });

  it('should return an empty list when there are no keys', () => {
    let result: KeyAssignment[] | undefined;

    service.getAll().subscribe(data => (result = data));

    expect(result).toEqual([]);
    expect(keyEndpointMock.assignments).toHaveBeenCalledTimes(1);
  });
});
