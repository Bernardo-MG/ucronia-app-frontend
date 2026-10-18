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
  beforeEach(() => {
    auth.hasPermission.and.returnValue(true);
    get.calls.reset();
    get.and.returnValue(of(new Member()));
    TestBed.configureTestingModule({ providers: [
      { provide: AuthService, useValue: auth },
      { provide: UcroniaClient, useValue: { memberProfile: { get } } }
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
