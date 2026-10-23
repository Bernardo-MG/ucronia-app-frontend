import { TestBed } from '@angular/core/testing';
import { Page } from '@bernardo-mg/request';
import { UcroniaClient } from '@ucronia/api';
import { Key, KeyAssignment } from '@ucronia/domain';
import { MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { MemberKeyService } from './member-key-service';

describe('MemberKeyService', () => {
  let service: MemberKeyService;

  const keyEndpointMock = jasmine.createSpyObj<UcroniaClient['key']>('KeyEndpoint', ['create', 'update', 'delete']);

  const assignmentEndpointMock = jasmine.createSpyObj<UcroniaClient['keyAssignment']>('KeyAssignmentEndpoint', ['page']);

  const messageServiceMock = jasmine.createSpyObj<MessageService>('MessageService', ['add']);

  beforeEach(() => {
    messageServiceMock.add.calls.reset();
    keyEndpointMock.create.calls.reset();
    keyEndpointMock.update.calls.reset();
    keyEndpointMock.delete.calls.reset();
    assignmentEndpointMock.page.calls.reset();
    assignmentEndpointMock.page.and.returnValue(
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
    keyEndpointMock.update.and.returnValue(of(key));
    let result: Key | undefined;

    service.update(key).subscribe(data => (result = data));

    expect(keyEndpointMock.update).toHaveBeenCalledOnceWith(7, { available: false, description: '' });
    expect(result).toBe(key);
    expect(messageServiceMock.add).toHaveBeenCalledOnceWith({
      severity: 'info', summary: 'Actualizado', detail: 'Llave actualizada', life: 3000
    });
  });

  it('should propagate update failures without a success message', () => {
    const failure = new Error('Update failed');
    keyEndpointMock.update.and.returnValue(throwError(() => failure));
    let result: unknown;

    service.update(new Key()).subscribe({ error: error => (result = error) });

    expect(result).toBe(failure);
    expect(messageServiceMock.add).not.toHaveBeenCalled();
  });

  it('should delete by key number and show the success message', () => {
    const key = Object.assign(new Key(), { number: 7 });
    keyEndpointMock.delete.and.returnValue(of(key));
    let result: Key | undefined;

    service.delete(7).subscribe(data => (result = data));

    expect(keyEndpointMock.delete).toHaveBeenCalledOnceWith(7);
    expect(result).toBe(key);
    expect(messageServiceMock.add).toHaveBeenCalledOnceWith({
      severity: 'info', summary: 'Borrado', detail: 'Llave borrada', life: 3000
    });
  });

  it('should propagate deletion failures and show the error message', () => {
    const failure = new Error('Delete failed');
    keyEndpointMock.delete.and.returnValue(throwError(() => failure));
    let result: unknown;

    service.delete(7).subscribe({ error: error => (result = error) });

    expect(result).toBe(failure);
    expect(messageServiceMock.add).toHaveBeenCalledOnceWith({
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

    assignmentEndpointMock.page.and.returnValues(
      of(Object.assign(new Page<KeyAssignment>(), { content: [assigned], page: 1, last: false })),
      of(Object.assign(new Page<KeyAssignment>(), { content: [unassigned], page: 2, last: true }))
    );
    let result: KeyAssignment[] = [];

    service.getAll().subscribe(data => (result = data));

    expect(result).toEqual([assigned, unassigned]);
    expect(assignmentEndpointMock.page.calls.allArgs().map(args => args[0])).toEqual([1, 2]);
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

  it('should return an empty list when there are no keys', () => {
    let result: KeyAssignment[] | undefined;

    service.getAll().subscribe(data => (result = data));

    expect(result).toEqual([]);
    expect(assignmentEndpointMock.page).toHaveBeenCalledTimes(1);
  });
});
