import { TestBed } from '@angular/core/testing';
import { Page } from '@bernardo-mg/request';
import { UcroniaClient } from '@ucronia/api';
import { Key, KeyAssignment } from '@ucronia/domain';
import { MessageService } from '@openng/optimus-ui/api';
import { of, throwError } from 'rxjs';
import { MemberKeyService } from './member-key-service';

describe('MemberKeyService', () => {
  let service: MemberKeyService;

  const keyEndpointMock = {
    create: vi.fn().mockName("KeyEndpoint.create"), update: vi.fn().mockName("KeyEndpoint.update"), delete: vi.fn().mockName("KeyEndpoint.delete")
};

  const assignmentEndpointMock = {
    page: vi.fn().mockName("KeyAssignmentEndpoint.page"), create: vi.fn().mockName("KeyAssignmentEndpoint.create"), update: vi.fn().mockName("KeyAssignmentEndpoint.update"), delete: vi.fn().mockName("KeyAssignmentEndpoint.delete")
};

  const messageServiceMock = {
    add: vi.fn().mockName("MessageService.add")
};

  beforeEach(() => {
    messageServiceMock.add.mockClear();
    keyEndpointMock.create.mockClear();
    keyEndpointMock.update.mockClear();
    keyEndpointMock.delete.mockClear();
    assignmentEndpointMock.page.mockClear();
    assignmentEndpointMock.page.mockReturnValue(
      of(Object.assign(new Page<KeyAssignment>(), { content: [], page: 1, last: true }))
    );

    TestBed.configureTestingModule({
      providers: [
        { provide: MessageService, useValue: messageServiceMock },
        { provide: UcroniaClient, useValue: { key: keyEndpointMock, keyAssignment: assignmentEndpointMock } }
      ]
    });

    service = TestBed.inject(MemberKeyService);
  });

  it('should update the key by its number and show a success message', () => {
    const key = Object.assign(new Key(), { number: 7, available: false, description: '' });
    keyEndpointMock.update.mockReturnValue(of(key));
    let result: Key | undefined;

    service.update(key).subscribe(data => (result = data));

    expect(keyEndpointMock.update).toHaveBeenCalledTimes(1);

    expect(keyEndpointMock.update).toHaveBeenCalledWith(7, { available: false, description: '' });
    expect(result).toBe(key);
    expect(messageServiceMock.add).toHaveBeenCalledTimes(1);
    expect(messageServiceMock.add).toHaveBeenCalledWith({
      severity: 'info', summary: 'Actualizado', detail: 'Llave actualizada', life: 3000
    });
  });

  it('should propagate update failures without a success message', () => {
    const failure = new Error('Update failed');
    keyEndpointMock.update.mockReturnValue(throwError(() => failure));
    let result: unknown;

    service.update(new Key()).subscribe({ error: error => (result = error) });

    expect(result).toBe(failure);
    expect(messageServiceMock.add).not.toHaveBeenCalled();
  });

  it('should delete by key number and show the success message', () => {
    const key = Object.assign(new Key(), { number: 7 });
    keyEndpointMock.delete.mockReturnValue(of(key));
    let result: Key | undefined;

    service.delete(7).subscribe(data => (result = data));

    expect(keyEndpointMock.delete).toHaveBeenCalledTimes(1);

    expect(keyEndpointMock.delete).toHaveBeenCalledWith(7);
    expect(result).toBe(key);
    expect(messageServiceMock.add).toHaveBeenCalledTimes(1);
    expect(messageServiceMock.add).toHaveBeenCalledWith({
      severity: 'info', summary: 'Borrado', detail: 'Llave borrada', life: 3000
    });
  });

  it('should propagate deletion failures and show the error message', () => {
    const failure = new Error('Delete failed');
    keyEndpointMock.delete.mockReturnValue(throwError(() => failure));
    let result: unknown;

    service.delete(7).subscribe({ error: error => (result = error) });

    expect(result).toBe(failure);
    expect(messageServiceMock.add).toHaveBeenCalledTimes(1);
    expect(messageServiceMock.add).toHaveBeenCalledWith({
      severity: 'error', summary: 'Error', detail: 'No se pudo borrar la llave', life: 5000
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should read all pages and retain unassigned keys', () => {
    const assigned: KeyAssignment = {
      number: 1,
      available: true,
      description: 'Principal',
      profile: { number: 10, name: 'Ana' }
    };
    const unassigned: KeyAssignment = { number: 2, available: false, description: 'Lateral' };

    assignmentEndpointMock.page.mockReturnValueOnce(
      of(Object.assign(new Page<KeyAssignment>(), { content: [assigned], page: 1, last: false }))).mockReturnValueOnce(
      of(Object.assign(new Page<KeyAssignment>(), { content: [unassigned], page: 2, last: true }))
    );
    let result: KeyAssignment[] = [];

    service.getAll().subscribe(data => (result = data));

    expect(result).toEqual([assigned, unassigned]);
    expect(vi.mocked(assignmentEndpointMock.page).mock.calls.map(args => args[0])).toEqual([undefined, 2]);
  });

  it('should create a key and show the success message', () => {
    const key = Object.assign(new Key(), { number: 5, available: false, description: 'Lateral' });
    keyEndpointMock.create.mockReturnValue(of(key));
    let result: Key | undefined;

    service.create(key).subscribe(data => (result = data));

    expect(keyEndpointMock.create).toHaveBeenCalledTimes(1);

    expect(keyEndpointMock.create).toHaveBeenCalledWith({ available: false, description: 'Lateral' });
    expect(result).toBe(key);
    expect(messageServiceMock.add).toHaveBeenCalledTimes(1);
    expect(messageServiceMock.add).toHaveBeenCalledWith({
      severity: 'info', summary: 'Creado', detail: 'Llave creada', life: 3000
    });
  });

  it('should propagate creation failures without a success message', () => {
    const failure = new Error('Save failed');
    keyEndpointMock.create.mockReturnValue(throwError(() => failure));
    let result: unknown;

    service.create(new Key()).subscribe({ error: error => (result = error) });

    expect(result).toBe(failure);
    expect(messageServiceMock.add).not.toHaveBeenCalled();
  });

  it('should return an empty list when there are no keys', () => {
    let result: KeyAssignment[] | undefined;

    service.getAll().subscribe(data => (result = data));

    expect(result).toEqual([]);
    expect(assignmentEndpointMock.page).toHaveBeenCalledTimes(1);
  });

  it('removes the assignment without deleting the key', () => {
    const key: KeyAssignment = { number: 7, available: true, description: 'Principal' };
    assignmentEndpointMock.delete.mockReturnValue(of(key));
    let result: KeyAssignment | undefined;

    service.unassign(7).subscribe(value => (result = value));

    expect(assignmentEndpointMock.delete).toHaveBeenCalledTimes(1);

    expect(assignmentEndpointMock.delete).toHaveBeenCalledWith(7);
    expect(keyEndpointMock.delete).not.toHaveBeenCalled();
    expect(result).toBe(key);
    expect(messageServiceMock.add).toHaveBeenCalledTimes(
      1);
      expect(messageServiceMock.add).toHaveBeenCalledWith(expect.objectContaining({ detail: 'Asignación de llave eliminada' })
    );
  });

  describe('assignments', () => {
    const assignment: KeyAssignment = {
      number: 7,
      available: true,
      description: 'Principal',
      profile: { number: 12, name: 'Ana López' }
    };

    beforeEach(() => {
      assignmentEndpointMock.create.mockClear();
      assignmentEndpointMock.update.mockClear();
      assignmentEndpointMock.create.mockReturnValue(of(assignment));
      assignmentEndpointMock.update.mockReturnValue(of(assignment));
    });

    it('uses the assignment endpoint with key and profile numbers', () => {
      let result: KeyAssignment | undefined;

      service.assign(7, 12).subscribe(value => (result = value));

      expect(assignmentEndpointMock.create).toHaveBeenCalledTimes(1);

      expect(assignmentEndpointMock.create).toHaveBeenCalledWith({ number: 7, profile: 12 });
      expect(result).toBe(assignment);
      expect(messageServiceMock.add).toHaveBeenCalledTimes(1);
      expect(messageServiceMock.add).toHaveBeenCalledWith({
        severity: 'info', summary: 'Asignado', detail: 'Llave asignada', life: 3000
      });
    });

    it('propagates failure without showing a success message', () => {
      const failure = new Error('Conflict');
      assignmentEndpointMock.create.mockReturnValue(throwError(() => failure));
      let result: unknown;

      service.assign(7, 12).subscribe({ error: error => (result = error) });

      expect(result).toBe(failure);
      expect(messageServiceMock.add).not.toHaveBeenCalled();
    });

    it('updates an existing assignment with the new profile number', () => {
      let result: KeyAssignment | undefined;

      service.reassign(7, 12).subscribe(value => (result = value));

      expect(assignmentEndpointMock.update).toHaveBeenCalledTimes(1);

      expect(assignmentEndpointMock.update).toHaveBeenCalledWith(7, { profile: 12 });
      expect(assignmentEndpointMock.create).not.toHaveBeenCalled();
      expect(result).toBe(assignment);
      expect(messageServiceMock.add).toHaveBeenCalledTimes(1);
      expect(messageServiceMock.add).toHaveBeenCalledWith({
        severity: 'info', summary: 'Actualizado', detail: 'Asignación de llave actualizada', life: 3000
      });
    });

    it('propagates reassignment failure without showing a success message', () => {
      const failure = new Error('Unavailable');
      assignmentEndpointMock.update.mockReturnValue(throwError(() => failure));
      let result: unknown;

      service.reassign(7, 12).subscribe({ error: error => (result = error) });

      expect(result).toBe(failure);
      expect(messageServiceMock.add).not.toHaveBeenCalled();
    });
  });
});
