import { TestBed } from '@angular/core/testing';
import { MemberCreation, MemberUpdate, UcroniaClient } from '@ucronia/api';
import { Member } from '@ucronia/domain';
import { MessageService } from '@openng/optimus-ui/api';
import { of, throwError } from 'rxjs';
import { MemberProfileService } from './member-profile-service';

describe('MemberProfileService', () => {
  let service: MemberProfileService;

  const endpointMock = {
    get: vi.fn().mockName("MemberProfileEndpoint.get"), create: vi.fn().mockName("MemberProfileEndpoint.create"),
    update: vi.fn().mockName("MemberProfileEndpoint.update"),
    delete: vi.fn().mockName("MemberProfileEndpoint.delete")
};
  const messageServiceMock = {
    add: vi.fn().mockName("MessageService.add")
};

  beforeEach(() => {
    endpointMock.delete.mockClear();
    endpointMock.get.mockClear();
    endpointMock.create.mockClear();
    endpointMock.update.mockClear();
    messageServiceMock.add.mockClear();
    endpointMock.delete.mockReturnValue(of(new Member()));
    endpointMock.get.mockReturnValue(of(new Member()));
    endpointMock.create.mockReturnValue(of(new Member()));
    endpointMock.update.mockReturnValue(of(new Member()));

    TestBed.configureTestingModule({
      providers: [
        { provide: UcroniaClient, useValue: { memberProfile: endpointMock } },
        { provide: MessageService, useValue: messageServiceMock }
      ]
    });

    service = TestBed.inject(MemberProfileService);
  });

  it('should delete using the profile number and show the success message', () => {
    const member = Object.assign(new Member(), { number: 12, memberNumber: 37 });
    endpointMock.delete.mockReturnValue(of(member));
    let result: Member | undefined;

    service.delete(12).subscribe(response => (result = response));

    expect(endpointMock.delete).toHaveBeenCalledTimes(1);

    expect(endpointMock.delete).toHaveBeenCalledWith(12);
    expect(result).toBe(member);
    expect(messageServiceMock.add).toHaveBeenCalledTimes(1);
    expect(messageServiceMock.add).toHaveBeenCalledWith({
      severity: 'info',
      summary: 'Borrado',
      detail: 'Socio borrado',
      life: 3000
    });
  });

  it('should propagate deletion failures and show the error message', () => {
    const failure = new Error('Delete failed');
    endpointMock.delete.mockReturnValue(throwError(() => failure));
    let result: unknown;

    service.delete(12).subscribe({ error: error => (result = error) });

    expect(result).toBe(failure);
    expect(messageServiceMock.add).toHaveBeenCalledTimes(1);
    expect(messageServiceMock.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo borrar el socio',
      life: 5000
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load private information using the profile number', () => {
    const member = Object.assign(new Member(), { number: 12, memberNumber: 37 });
    endpointMock.get.mockReturnValue(of(member));
    let result: Member | undefined;

    service.getOne(12).subscribe(data => (result = data));

    expect(endpointMock.get).toHaveBeenCalledTimes(1);

    expect(endpointMock.get).toHaveBeenCalledWith(12);
    expect(result).toBe(member);
    expect(messageServiceMock.add).not.toHaveBeenCalled();
  });

  it('should pass the creation request directly and show the success message', () => {
    const data = new MemberCreation(3, '', { firstName: 'Ana', lastName: '' });
    const member = new Member();
    endpointMock.create.mockReturnValue(of(member));
    let result: Member | undefined;

    service.create(data).subscribe(response => (result = response));

    expect(endpointMock.create).toHaveBeenCalledTimes(1);
    expect(endpointMock.create).toHaveBeenCalledWith(data);
    expect(vi.mocked(endpointMock.create).mock.lastCall![0]).toBe(data);
    expect(result).toBe(member);
    expect(messageServiceMock.add).toHaveBeenCalledTimes(1);
    expect(messageServiceMock.add).toHaveBeenCalledWith({
      severity: 'info',
      summary: 'Creado',
      detail: 'Socio creado',
      life: 3000
    });
  });

  it('should pass the full update directly using the profile number', () => {
    const data: MemberUpdate = {
      feeType: 3,
      identifier: '',
      name: { firstName: 'Ana', lastName: '' },
      birthDate: undefined,
      address: '',
      comments: '',
      contactChannels: [],
      active: false,
      renew: false
    };
    const member = new Member();
    endpointMock.update.mockReturnValue(of(member));
    let result: Member | undefined;

    service.update(12, data).subscribe(response => (result = response));

    expect(endpointMock.update).toHaveBeenCalledTimes(1);

    expect(endpointMock.update).toHaveBeenCalledWith(12, data);
    expect(vi.mocked(endpointMock.update).mock.lastCall![1]).toBe(data);
    expect(result).toBe(member);
    expect(messageServiceMock.add).toHaveBeenCalledTimes(1);
    expect(messageServiceMock.add).toHaveBeenCalledWith({
      severity: 'info',
      summary: 'Actualizado',
      detail: 'Socio actualizado',
      life: 3000
    });
  });

  it('should propagate creation errors without a success message', () => {
    const failure = new Error('Failed');
    endpointMock.create.mockReturnValue(throwError(() => failure));
    let result: unknown;

    service
      .create(new MemberCreation(3, '', { firstName: 'Ana', lastName: '' }))
      .subscribe({ error: error => (result = error) });

    expect(result).toBe(failure);
    expect(messageServiceMock.add).not.toHaveBeenCalled();
  });

  it('should propagate update errors without a success message', () => {
    const failure = new Error('Failed');
    endpointMock.update.mockReturnValue(throwError(() => failure));
    let result: unknown;

    service
      .update(12, {
        feeType: 3,
        name: { firstName: 'Ana', lastName: '' },
        contactChannels: [],
        active: true,
        renew: true
      })
      .subscribe({ error: error => (result = error) });

    expect(result).toBe(failure);
    expect(messageServiceMock.add).not.toHaveBeenCalled();
  });
});
