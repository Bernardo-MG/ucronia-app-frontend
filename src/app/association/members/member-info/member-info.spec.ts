import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ContactMethodService } from '@app/settings/contact-method-service';
import { FeeTypeService } from '@app/settings/fee-type-service';
import { KeyService } from '@app/settings/key-service';
import { AuthService } from '@bernardo-mg/authentication';
import { MemberUpdate, UcroniaClient } from '@ucronia/api';
import { UcroniaPermissions } from '@ucronia/auth';
import { Member, PublicMember } from '@ucronia/domain';
import { MessageService } from 'primeng/api';
import { of, Subject, throwError } from 'rxjs';
import { MemberInfo } from './member-info';

describe('MemberInfo', () => {
  let component: MemberInfo;
  let fixture: ComponentFixture<MemberInfo>;
  let publicMember: PublicMember;
  let member: Member;
  let change: MemberUpdate;

  const authServiceMock = jasmine.createSpyObj<AuthService>('AuthService', ['hasPermission']);
  const memberEndpointMock = jasmine.createSpyObj<UcroniaClient['memberProfile']>('MemberEndpoint', ['get', 'update']);
  const feeTypeServiceMock = jasmine.createSpyObj<FeeTypeService>('FeeTypeService', ['getAllAvailable']);
  const contactMethodServiceMock = jasmine.createSpyObj<ContactMethodService>('ContactMethodService', [
    'getAllAvailable'
  ]);
  const keyServiceMock = jasmine.createSpyObj<KeyService>('KeyService', ['getAllAvailable']);

  beforeEach(async () => {
    publicMember = Object.assign(new PublicMember(), { number: 12, memberNumber: 37 });
    member = Object.assign(new Member(), { number: 12, memberNumber: 37 });
    change = {
      name: { firstName: 'Ana', lastName: 'López' },
      feeType: 3,
      contactChannels: [],
      active: false,
      renew: false
    };
    authServiceMock.hasPermission.and.returnValue(true);
    memberEndpointMock.get.calls.reset();
    memberEndpointMock.update.calls.reset();
    feeTypeServiceMock.getAllAvailable.calls.reset();
    contactMethodServiceMock.getAllAvailable.calls.reset();
    keyServiceMock.getAllAvailable.calls.reset();
    memberEndpointMock.get.and.returnValue(of(member));
    memberEndpointMock.update.and.returnValue(of({ ...member, active: false, renew: false }));
    feeTypeServiceMock.getAllAvailable.and.returnValue(of([]));
    contactMethodServiceMock.getAllAvailable.and.returnValue(of([]));
    keyServiceMock.getAllAvailable.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [MemberInfo],
      providers: [
        MessageService,
        provideNoopAnimations(),
        { provide: AuthService, useValue: authServiceMock },
        { provide: UcroniaClient, useValue: { memberProfile: memberEndpointMock } },
        { provide: FeeTypeService, useValue: feeTypeServiceMock },
        { provide: ContactMethodService, useValue: contactMethodServiceMock },
        { provide: KeyService, useValue: keyServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MemberInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should guard the drawer with member read permission', () => {
    authServiceMock.hasPermission.and.returnValue(false);
    fixture.destroy();

    fixture = TestBed.createComponent(MemberInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.open(publicMember);

    expect(component.visible()).toBeFalse();
    expect(memberEndpointMock.get).not.toHaveBeenCalled();
  });

  it('should show public information without requesting a private profile for member read access alone', () => {
    authServiceMock.hasPermission.and.callFake(permission => permission === UcroniaPermissions.directory.member.read);
    fixture.destroy();

    fixture = TestBed.createComponent(MemberInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.open(publicMember);
    component.retry();
    fixture.detectChanges();

    expect(component.publicData()).toBe(publicMember);
    expect(component.visible()).toBeTrue();
    expect(component.canReadPrivate).toBeFalse();
    expect(component.loading()).toBeFalse();
    expect(memberEndpointMock.get).not.toHaveBeenCalled();
    expect(document.querySelector('#member-private-info-heading')).toBeNull();
  });

  it('should not grant public access from private profile read permission alone', () => {
    authServiceMock.hasPermission.and.callFake(
      permission => permission === UcroniaPermissions.directory.memberProfile.read
    );
    fixture.destroy();

    fixture = TestBed.createComponent(MemberInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.open(publicMember);

    expect(component.visible()).toBeFalse();
    expect(memberEndpointMock.get).not.toHaveBeenCalled();
  });

  it('should not offer editing from member update permission alone', () => {
    authServiceMock.hasPermission.and.callFake(
      permission => permission !== UcroniaPermissions.directory.memberProfile.update
    );
    fixture.destroy();

    fixture = TestBed.createComponent(MemberInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.open(publicMember);
    component.startEdit();
    component.onUpdate(change);

    expect(component.canUpdate).toBeFalse();
    expect(component.editing()).toBeFalse();
    expect(feeTypeServiceMock.getAllAvailable).not.toHaveBeenCalled();
    expect(memberEndpointMock.update).not.toHaveBeenCalled();
  });

  it('should require profile read access to populate the complete edit form', () => {
    authServiceMock.hasPermission.and.callFake(
      permission => permission !== UcroniaPermissions.directory.memberProfile.read
    );
    fixture.destroy();

    fixture = TestBed.createComponent(MemberInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.open(publicMember);
    component.startEdit();

    expect(component.canUpdate).toBeTrue();
    expect(component.editing()).toBeFalse();
    expect(memberEndpointMock.get).not.toHaveBeenCalled();
    expect(feeTypeServiceMock.getAllAvailable).not.toHaveBeenCalled();
  });

  it('should save by profile number and emit the updated member', () => {
    const updated = spyOn(component.updated, 'emit');

    component.open(publicMember);
    component.startEdit();

    expect(component.optionsReady()).toBeTrue();

    component.onUpdate(change);

    expect(memberEndpointMock.update).toHaveBeenCalledOnceWith(12, change);
    expect(component.editing()).toBeFalse();
    expect(component.data()?.renew).toBeFalse();
    expect(component.publicData()?.memberNumber).toBe(37);
    expect(updated).toHaveBeenCalledOnceWith(jasmine.objectContaining({ number: 12, memberNumber: 37, renew: false }));
  });

  it('should keep the form open after save failure and block duplicate saves', () => {
    const pending = new Subject<Member>();

    memberEndpointMock.update.and.returnValue(pending);
    component.open(publicMember);
    component.startEdit();
    component.onUpdate(change);
    component.onUpdate(change);
    component.close();

    expect(component.visible()).toBeTrue();
    expect(memberEndpointMock.update).toHaveBeenCalledTimes(1);

    pending.error(new Error('Save failed'));

    expect(component.saving()).toBeFalse();
    expect(component.editing()).toBeTrue();
    expect(component.editError()).not.toBe('');

    component.cancelEdit();

    expect(component.editing()).toBeFalse();
  });

  it('should cancel pending profile reads on selection change and close', () => {
    const first = new Subject<Member>();
    const second = new Subject<Member>();

    memberEndpointMock.get.and.returnValues(first, second);
    component.open(publicMember);
    component.open({ ...publicMember, number: 13 });
    first.next(member);

    expect(component.data()).toBeNull();

    second.next({ ...member, number: 13 });

    expect(component.data()?.number).toBe(13);

    component.close();
    second.next(member);

    expect(component.data()).toBeNull();
    expect(component.visible()).toBeFalse();
  });

  it('should preserve public information when the private profile fails and retry the same number', () => {
    memberEndpointMock.get.and.returnValues(
      throwError(() => new Error('Failed')),
      of(member)
    );
    component.open(publicMember);

    expect(component.error()).toBeTrue();
    expect(component.publicData()?.memberNumber).toBe(37);
    expect(component.loading()).toBeFalse();

    component.retry();

    expect(memberEndpointMock.get.calls.allArgs()).toEqual([[12], [12]]);
    expect(component.data()).toBe(member);
    expect(component.error()).toBeFalse();
  });
});
