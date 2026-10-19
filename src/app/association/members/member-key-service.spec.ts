import { TestBed } from '@angular/core/testing';
import { Page } from '@bernardo-mg/request';
import { UcroniaClient } from '@ucronia/api';
import { Key, KeyAssignment } from '@ucronia/domain';
import { MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { MemberKeyService } from './member-key-service';

describe('MemberKeyService', () => {
  let service: MemberKeyService;

  const keyEndpointMock = jasmine.createSpyObj<UcroniaClient['key']>('KeyEndpoint', ['assignments', 'page', 'create']);

  const messageServiceMock = jasmine.createSpyObj<MessageService>('MessageService', ['add']);

  beforeEach(() => {
    messageServiceMock.add.calls.reset();
    keyEndpointMock.create.calls.reset();
    keyEndpointMock.page.calls.reset();
    keyEndpointMock.assignments.calls.reset();
    keyEndpointMock.assignments.and.returnValue(
      of(Object.assign(new Page<KeyAssignment>(), { content: [], page: 1, last: true }))
    );

    TestBed.configureTestingModule({
      providers: [
        { provide: MessageService, useValue: messageServiceMock },
        { provide: UcroniaClient, useValue: { key: keyEndpointMock } }
      ]
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

  it('should create a key and show the success message', () => {
    const key = Object.assign(new Key(), { number: 5, available: false, description: 'Lateral' });
    keyEndpointMock.create.and.returnValue(of(key));
    let result: Key | undefined;

    service.create(key).subscribe(data => (result = data));

    expect(keyEndpointMock.create).toHaveBeenCalledOnceWith({ available: false, description: 'Lateral' });
    expect(result).toBe(key);
    expect(messageServiceMock.add).toHaveBeenCalledOnceWith({
      severity: 'info', summary: 'Creado', detail: 'Llave creada', life: 3000
    });
  });

  it('should propagate creation failures without a success message', () => {
    const failure = new Error('Save failed');
    keyEndpointMock.create.and.returnValue(throwError(() => failure));
    let result: unknown;

    service.create(new Key()).subscribe({ error: error => (result = error) });

    expect(result).toBe(failure);
    expect(messageServiceMock.add).not.toHaveBeenCalled();
  });

  it('should read all key pages for the member form', () => {
    const first = Object.assign(new Key(), { number: 1 });
    const second = Object.assign(new Key(), { number: 2 });
    keyEndpointMock.page.and.returnValues(
      of(Object.assign(new Page<Key>(), { content: [first], page: 1, last: false })),
      of(Object.assign(new Page<Key>(), { content: [second], page: 2, last: true }))
    );
    let result: Key[] = [];

    service.getAllAvailable().subscribe(data => (result = data));

    expect(result).toEqual([first, second]);
    expect(keyEndpointMock.page.calls.allArgs().map(args => args[0])).toEqual([1, 2]);
  });

  it('should return an empty list when there are no keys', () => {
    let result: KeyAssignment[] | undefined;

    service.getAll().subscribe(data => (result = data));

    expect(result).toEqual([]);
    expect(keyEndpointMock.assignments).toHaveBeenCalledTimes(1);
  });
});
