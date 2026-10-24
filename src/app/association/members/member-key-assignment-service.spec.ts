import { TestBed } from '@angular/core/testing';
import { UcroniaClient } from '@ucronia/api';
import { KeyAssignment } from '@ucronia/domain';
import { MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { MemberKeyService } from './member-key-service';

describe('MemberKeyService - assign', () => {
  let service: MemberKeyService;

  const endpointMock = jasmine.createSpyObj<UcroniaClient['keyAssignment']>('KeyAssignmentEndpoint', ['create']);
  const messageServiceMock = jasmine.createSpyObj<MessageService>('MessageService', ['add']);
  const assignment: KeyAssignment = {
    number: 7,
    available: true,
    description: 'Principal',
    profile: { number: 12, name: 'Ana López' }
  };

  beforeEach(() => {
    endpointMock.create.calls.reset();
    messageServiceMock.add.calls.reset();
    endpointMock.create.and.returnValue(of(assignment));

    TestBed.configureTestingModule({
      providers: [
        { provide: UcroniaClient, useValue: { keyAssignment: endpointMock } },
        { provide: MessageService, useValue: messageServiceMock }
      ]
    });
    service = TestBed.inject(MemberKeyService);
  });

  it('uses the assignment endpoint with key and profile numbers', () => {
    let result: KeyAssignment | undefined;

    service.assign(7, 12).subscribe(value => (result = value));

    expect(endpointMock.create).toHaveBeenCalledOnceWith({ number: 7, profile: 12 });
    expect(result).toBe(assignment);
    expect(messageServiceMock.add).toHaveBeenCalledOnceWith({
      severity: 'info', summary: 'Asignado', detail: 'Llave asignada', life: 3000
    });
  });

  it('propagates failure without showing a success message', () => {
    const failure = new Error('Conflict');
    endpointMock.create.and.returnValue(throwError(() => failure));
    let result: unknown;

    service.assign(7, 12).subscribe({ error: error => (result = error) });

    expect(result).toBe(failure);
    expect(messageServiceMock.add).not.toHaveBeenCalled();
  });
});
