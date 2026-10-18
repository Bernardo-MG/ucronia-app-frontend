import { FeeTypeService } from '@app/settings/fee-type-service';
import { ContactMethodService } from '@app/settings/contact-method-service';
import { KeyService } from '@app/settings/key-service';
import { MessageService } from 'primeng/api';
import { MemberUpdate } from '@ucronia/api';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '@bernardo-mg/authentication';
import { UcroniaClient } from '@ucronia/api';
import { UcroniaPermissions } from '@ucronia/auth';
import { Member, PublicMember } from '@ucronia/domain';
import { of, Subject, throwError } from 'rxjs';
import { MemberInfo } from './member-info';

describe('MemberInfo', () => {
  const auth = { hasPermission: jasmine.createSpy() };
  const get = jasmine.createSpy();
  const update = jasmine.createSpy();
  const options = { getAllAvailable: jasmine.createSpy() };
  const change: MemberUpdate = { name: { firstName: 'Updated', lastName: '' }, feeType: 3, contactChannels: [], active: false, renew: false };
  beforeEach(() => {
    auth.hasPermission.and.returnValue(true);
    get.calls.reset();
    update.calls.reset();
    update.and.returnValue(of(Object.assign(new Member(), { number: 12, memberNumber: 37, active: false, renew: false })));
    options.getAllAvailable.calls.reset();
    options.getAllAvailable.and.returnValue(of([]));
    get.and.returnValue(of(new Member()));
    TestBed.configureTestingModule({ providers: [
      { provide: FeeTypeService, useValue: options },
      { provide: ContactMethodService, useValue: options },
      { provide: KeyService, useValue: options },
      { provide: MessageService, useValue: { add: jasmine.createSpy() } },
      { provide: AuthService, useValue: auth },
      { provide: UcroniaClient, useValue: { memberProfile: { get, update } } }
    ] });
  });
  const publicMember = (number: number) => Object.assign(new PublicMember(), { number, memberNumber: 37 });
  const create = () => TestBed.runInInjectionContext(() => new MemberInfo());

  it('guards the drawer with member read permission', () => {
    auth.hasPermission.and.returnValue(false);
    const component = create();
    component.open(publicMember(12));
    expect(auth.hasPermission).toHaveBeenCalledWith(UcroniaPermissions.directory.member.read);
    expect(get).not.toHaveBeenCalled();
    expect(component.visible()).toBeFalse();
  });

  it('shows public information without fetching private data for member read access alone', () => {
    auth.hasPermission.and.callFake(permission => permission === UcroniaPermissions.directory.member.read);
    const component = create();
    const member = publicMember(12);
    component.open(member);
    expect(component.publicData()).toBe(member);
    expect(component.visible()).toBeTrue();
    expect(component.canReadPrivate).toBeFalse();
    expect(component.loading()).toBeFalse();
    expect(get).not.toHaveBeenCalled();
    component.retry();
    expect(get).not.toHaveBeenCalled();
  });

  it('does not grant public access from private profile permission alone', () => {
    auth.hasPermission.and.callFake(permission => permission === UcroniaPermissions.directory.memberProfile.read);
    const component = create();
    component.open(publicMember(12));
    expect(component.visible()).toBeFalse();
    expect(get).not.toHaveBeenCalled();
  });

  it('does not offer editing from member update permission alone', () => {
    auth.hasPermission.and.callFake(permission => permission !== UcroniaPermissions.directory.memberProfile.update);
    const component = create();
    component.open(publicMember(12));
    component.startEdit();
    component.onUpdate(change);
    expect(component.canUpdate).toBeFalse();
    expect(component.editing()).toBeFalse();
    expect(options.getAllAvailable).not.toHaveBeenCalled();
    expect(update).not.toHaveBeenCalled();
  });

  it('requires private read access to populate the full edit form', () => {
    auth.hasPermission.and.callFake(permission => permission !== UcroniaPermissions.directory.memberProfile.read);
    const component = create();
    component.open(publicMember(12));
    component.startEdit();
    expect(component.canUpdate).toBeTrue();
    expect(component.editing()).toBeFalse();
    expect(get).not.toHaveBeenCalled();
    expect(options.getAllAvailable).not.toHaveBeenCalled();
  });

  it('saves by profile number and emits an update for list and counter refresh', () => {
    get.and.returnValue(of(Object.assign(new Member(), { number: 12, memberNumber: 37 })));
    const component = create();
    const saved = jasmine.createSpy();
    component.updated.subscribe(saved);
    component.open(publicMember(12));
    component.startEdit();
    expect(component.optionsReady()).toBeTrue();
    component.onUpdate(change);
    expect(update).toHaveBeenCalledWith(12, change);
    expect(component.editing()).toBeFalse();
    expect(component.data()!.renew).toBeFalse();
    expect(component.publicData()!.memberNumber).toBe(37);
    expect(saved).toHaveBeenCalled();
  });

  it('keeps the form open on save failure and blocks duplicate saves', () => {
    const pending = new Subject<Member>();
    update.and.returnValue(pending);
    const component = create();
    component.open(publicMember(12));
    component.startEdit();
    component.onUpdate(change);
    component.onUpdate(change);
    component.close();
    expect(component.visible()).toBeTrue();
    expect(update).toHaveBeenCalledTimes(1);
    pending.error(new Error('Save failed'));
    expect(component.saving()).toBeFalse();
    expect(component.editing()).toBeTrue();
    expect(component.editError()).not.toBe('');
    component.cancelEdit();
    expect(component.editing()).toBeFalse();
  });

  it('clears previous data and cancels pending requests on close or selection change', () => {
    const first = new Subject<Member>();
    const second = new Subject<Member>();
    get.and.returnValues(first, second);
    const component = create();
    component.open(publicMember(12));
    component.open(publicMember(13));
    first.next(Object.assign(new Member(), { number: 12 }));
    expect(component.data()).toBeNull();
    second.next(Object.assign(new Member(), { number: 13 }));
    expect(component.data()!.number).toBe(13);
    component.close();
    second.next(new Member());
    expect(component.data()).toBeNull();
    expect(component.visible()).toBeFalse();
  });

  it('shows load failures and retries the same profile number', () => {
    const member = Object.assign(new Member(), { number: 12, memberNumber: 37 });
    get.and.returnValues(throwError(() => new Error('Failed')), of(member));
    const component = create();
    component.open(publicMember(12));
    expect(component.error()).toBeTrue();
    expect(component.publicData()!.memberNumber).toBe(37);
    expect(component.loading()).toBeFalse();
    component.retry();
    expect(get.calls.allArgs()).toEqual([[12], [12]]);
    expect(component.data()).toBe(member);
    expect(component.error()).toBeFalse();
  });
});
