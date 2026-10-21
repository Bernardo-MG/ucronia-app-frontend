import { TestBed } from '@angular/core/testing';
import { MemberCreation, MemberUpdate, UcroniaClient } from '@ucronia/api';
import { Member } from '@ucronia/domain';
import { MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { MemberProfileService } from './member-profile-service';

describe('MemberProfileService', () => {
  let service: MemberProfileService;

  const endpointMock = jasmine.createSpyObj<UcroniaClient['memberProfile']>('MemberProfileEndpoint', [
    'get',
    'create',
    'update'
  ]);
  const messageServiceMock = jasmine.createSpyObj<MessageService>('MessageService', ['add']);

  beforeEach(() => {
    endpointMock.get.calls.reset();
    endpointMock.create.calls.reset();
    endpointMock.update.calls.reset();
    messageServiceMock.add.calls.reset();
    endpointMock.get.and.returnValue(of(new Member()));
    endpointMock.create.and.returnValue(of(new Member()));
    endpointMock.update.and.returnValue(of(new Member()));

    TestBed.configureTestingModule({
      providers: [
        { provide: UcroniaClient, useValue: { memberProfile: endpointMock } },
        { provide: MessageService, useValue: messageServiceMock }
      ]
    });

    service = TestBed.inject(MemberProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load private information using the profile number', () => {
    const member = Object.assign(new Member(), { number: 12, memberNumber: 37 });
    endpointMock.get.and.returnValue(of(member));
    let result: Member | undefined;

    service.getOne(12).subscribe(data => (result = data));

    expect(endpointMock.get).toHaveBeenCalledOnceWith(12);
    expect(result).toBe(member);
    expect(messageServiceMock.add).not.toHaveBeenCalled();
  });

  it('should pass the creation request directly and show the success message', () => {
    const data = new MemberCreation(3, '', { firstName: 'Ana', lastName: '' });
    const member = new Member();
    endpointMock.create.and.returnValue(of(member));
    let result: Member | undefined;

    service.create(data).subscribe(response => (result = response));

    expect(endpointMock.create).toHaveBeenCalledOnceWith(data);
    expect(endpointMock.create.calls.mostRecent().args[0]).toBe(data);
    expect(result).toBe(member);
    expect(messageServiceMock.add).toHaveBeenCalledOnceWith({
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
      key: undefined,
      active: false,
      renew: false
    };
    const member = new Member();
    endpointMock.update.and.returnValue(of(member));
    let result: Member | undefined;

    service.update(12, data).subscribe(response => (result = response));

    expect(endpointMock.update).toHaveBeenCalledOnceWith(12, data);
    expect(endpointMock.update.calls.mostRecent().args[1]).toBe(data);
    expect(result).toBe(member);
    expect(messageServiceMock.add).toHaveBeenCalledOnceWith({
      severity: 'info',
      summary: 'Actualizado',
      detail: 'Socio actualizado',
      life: 3000
    });
  });

  it('should propagate creation errors without a success message', () => {
    const failure = new Error('Failed');
    endpointMock.create.and.returnValue(throwError(() => failure));
    let result: unknown;

    service
      .create(new MemberCreation(3, '', { firstName: 'Ana', lastName: '' }))
      .subscribe({ error: error => (result = error) });

    expect(result).toBe(failure);
    expect(messageServiceMock.add).not.toHaveBeenCalled();
  });

  it('should propagate update errors without a success message', () => {
    const failure = new Error('Failed');
    endpointMock.update.and.returnValue(throwError(() => failure));
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
