import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ContactMethodService } from '@app/settings/contact-method-service';
import { FeeTypeService } from '@app/settings/fee-type-service';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, Page } from '@bernardo-mg/request';
import { MemberCount, MemberCreation, MemberUpdate } from '@ucronia/api';
import { UcroniaPermissions } from '@ucronia/auth';
import { Key, KeyAssignment, Member, PublicMember } from '@ucronia/domain';
import { ConfirmationService } from 'primeng/api';
import { of, Subject, throwError } from 'rxjs';
import { Dialog } from '../members-dialog';
import { MemberKeyForm } from '../member-key-form/member-key-form';
import { MemberProfileService } from '../member-profile-service';
import { MemberKeyService } from '../member-key-service';
import { PublicMemberService } from '../public-member-service';
import { PublicMemberView } from './public-member-view';

describe('PublicMemberView', () => {
  let component: PublicMemberView;
  let fixture: ComponentFixture<PublicMemberView>;

  const memberServiceMock = jasmine.createSpyObj<PublicMemberService>('MemberService', ['getAll', 'getSummary']);
  const authServiceMock = jasmine.createSpyObj<AuthService>('AuthService', ['hasPermission']);
  const memberProfileServiceMock = jasmine.createSpyObj<MemberProfileService>('MemberProfileService', [
    'create',
    'getOne',
    'update'
  ]);
  const memberKeyServiceMock = jasmine.createSpyObj<MemberKeyService>('MemberKeyService', [
    'getAll',
    'getAllAvailable',
    'create',
    'update',
    'delete'
  ]);
  const feeTypeServiceMock = jasmine.createSpyObj<FeeTypeService>('FeeTypeService', ['getAllAvailable']);
  const contactMethodServiceMock = jasmine.createSpyObj<ContactMethodService>('ContactMethodService', [
    'getAllAvailable'
  ]);

  beforeEach(async () => {
    authServiceMock.hasPermission.and.returnValue(true);
    memberProfileServiceMock.getOne.calls.reset();
    memberProfileServiceMock.update.calls.reset();
    memberProfileServiceMock.getOne.and.returnValue(of(new Member()));
    memberProfileServiceMock.update.and.returnValue(of(new Member()));
    memberKeyServiceMock.update.calls.reset();
    memberKeyServiceMock.delete.calls.reset();
    memberKeyServiceMock.update.and.returnValue(of(new Key()));
    memberKeyServiceMock.delete.and.returnValue(of(new Key()));
    memberProfileServiceMock.create.calls.reset();
    memberProfileServiceMock.create.and.returnValue(of(new Member()));
    feeTypeServiceMock.getAllAvailable.calls.reset();
    contactMethodServiceMock.getAllAvailable.calls.reset();
    memberKeyServiceMock.getAllAvailable.calls.reset();
    memberKeyServiceMock.create.calls.reset();
    memberKeyServiceMock.create.and.returnValue(of(new Key()));
    feeTypeServiceMock.getAllAvailable.and.returnValue(of([]));
    contactMethodServiceMock.getAllAvailable.and.returnValue(of([]));
    memberKeyServiceMock.getAllAvailable.and.returnValue(of([]));
    memberKeyServiceMock.getAll.calls.reset();
    memberKeyServiceMock.getAll.and.returnValue(of([]));
    memberServiceMock.getAll.and.returnValue(of(new Page<PublicMember>()));
    memberServiceMock.getSummary.and.returnValue(of(new MemberCount()));

    await TestBed.configureTestingModule({
      imports: [PublicMemberView],
      providers: [
        { provide: MemberKeyService, useValue: memberKeyServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: MemberProfileService, useValue: memberProfileServiceMock },
        { provide: FeeTypeService, useValue: feeTypeServiceMock },
        { provide: ContactMethodService, useValue: contactMethodServiceMock },
        ConfirmationService,
        provideAnimationsAsync(),
        { provide: PublicMemberService, useValue: memberServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PublicMemberView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('refreshes the current filtered page and counters', () => {
    component.onFilter('Alice');
    component.data.page = 2;
    const response = Object.assign(new Page<PublicMember>(), {
      page: 2,
      totalPages: 2,
      content: [new PublicMember()]
    });

    memberServiceMock.getAll.calls.reset();
    memberServiceMock.getSummary.calls.reset();
    memberServiceMock.getAll.and.returnValue(of(response));
    memberServiceMock.getSummary.and.returnValue(of({ active: 8, renew: 6 }));
    component.refresh();

    expect(memberServiceMock.getAll).toHaveBeenCalledWith(2, jasmine.anything(), 'Alice');
    expect(memberServiceMock.getSummary).toHaveBeenCalledTimes(1);
    expect(component.data).toBe(response);
    expect(component.active).toBe(8);
    expect(component.notRenewing).toBe(2);
  });

  it('loads the last available page when the refreshed page is empty', () => {
    component.data.page = 3;
    const empty = Object.assign(new Page<PublicMember>(), {
      page: 3,
      totalPages: 2,
      content: []
    });
    const previous = Object.assign(new Page<PublicMember>(), {
      page: 2,
      totalPages: 2,
      content: [new PublicMember()]
    });

    memberServiceMock.getAll.calls.reset();
    memberServiceMock.getAll.and.returnValues(of(empty), of(previous));
    component.refresh();

    expect(memberServiceMock.getAll.calls.allArgs().map(args => args[0])).toEqual([3, 2]);
    expect(component.data).toBe(previous);
    expect(component.status.loading).toBeFalse();
  });

  it('hides creation and does not load private options without permission', () => {
    authServiceMock.hasPermission.and.returnValue(false);
    const publicFixture = TestBed.createComponent(PublicMemberView);

    publicFixture.detectChanges();

    expect(publicFixture.nativeElement.textContent).not.toContain('Nuevo socio');

    publicFixture.componentInstance.onCreateOpen();

    expect(feeTypeServiceMock.getAllAvailable).not.toHaveBeenCalled();
    expect(contactMethodServiceMock.getAllAvailable).not.toHaveBeenCalled();
    expect(memberKeyServiceMock.getAllAvailable).not.toHaveBeenCalled();
    expect(memberProfileServiceMock.create).not.toHaveBeenCalled();

    publicFixture.destroy();
  });

  it('creates a full member and refreshes the public data', () => {
    component.onCreateOpen();
    const data = new MemberCreation(3, '', { firstName: 'Alice', lastName: '' });

    data.address = 'Address';
    data.active = true;
    data.renew = true;
    data.contactChannels = [{ method: 4, detail: 'alice@example.org' }];
    memberServiceMock.getAll.calls.reset();
    memberServiceMock.getSummary.calls.reset();
    component.onCreate(data);

    expect(memberProfileServiceMock.create).toHaveBeenCalledWith(
      jasmine.objectContaining({
        feeType: 3,
        address: 'Address',
        active: true,
        renew: true,
        contactChannels: [{ method: 4, detail: 'alice@example.org' }]
      })
    );
    expect(component.dialog).not.toBe(Dialog.CREATE);
    expect(memberServiceMock.getAll).toHaveBeenCalled();
    expect(memberServiceMock.getSummary).toHaveBeenCalled();
  });

  it('keeps the drawer open after a failed save', () => {
    component.onCreateOpen();
    memberProfileServiceMock.create.and.returnValue(throwError(() => new Error('Save failed')));
    const data = new MemberCreation(3, '', { firstName: 'Alice', lastName: '' });

    component.onCreate(data);

    expect(component.dialog).toBe(Dialog.CREATE);
    expect(component.status.saving).toBeFalse();
    expect(component.error).not.toBe('');
  });

  it('should load keys only when the authorized keys tab is selected', () => {
    expect(memberKeyServiceMock.getAll).not.toHaveBeenCalled();

    component.onTabChange('keys');
    fixture.detectChanges();

    expect(memberKeyServiceMock.getAll).toHaveBeenCalledTimes(1);
  });

  it('should hide the keys tab and reject forced selection without key read permission', () => {
    authServiceMock.hasPermission.and.callFake(permission => permission !== UcroniaPermissions.key.read);
    const restrictedFixture = TestBed.createComponent(PublicMemberView);

    restrictedFixture.detectChanges();
    restrictedFixture.componentInstance.onTabChange('keys');
    restrictedFixture.detectChanges();

    expect(restrictedFixture.nativeElement.querySelector('p-tab[value="keys"]')).toBeNull();
    expect(restrictedFixture.componentInstance.selectedTab).toBe('members');
    expect(memberKeyServiceMock.getAll).not.toHaveBeenCalled();

    restrictedFixture.destroy();
  });

  it('should show the creation button for the selected tab', () => {
    expect(fixture.nativeElement.textContent).toContain('Nuevo socio');
    expect(fixture.nativeElement.textContent).not.toContain('Nueva llave');

    component.onTabChange('keys');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).not.toContain('Nuevo socio');
    expect(fixture.nativeElement.textContent).toContain('Nueva llave');

    component.onTabChange('members');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Nuevo socio');
    expect(fixture.nativeElement.textContent).not.toContain('Nueva llave');
  });

  it('should require key creation permission to open or submit the key form', () => {
    authServiceMock.hasPermission.and.callFake(permission => permission !== UcroniaPermissions.key.create);
    fixture.destroy();
    fixture = TestBed.createComponent(PublicMemberView);
    component = fixture.componentInstance;
    component.onTabChange('keys');
    fixture.detectChanges();
    component.onCreateKeyOpen();
    component.onCreateKey(new Key());

    expect(fixture.nativeElement.textContent).not.toContain('Nueva llave');
    expect(component.dialog).not.toBe(Dialog.KEY_CREATE);
    expect(memberKeyServiceMock.create).not.toHaveBeenCalled();
  });

  it('should allow key creation without member creation permission', () => {
    authServiceMock.hasPermission.and.callFake(
      permission => permission !== UcroniaPermissions.directory.memberProfile.create
    );
    fixture.destroy();
    fixture = TestBed.createComponent(PublicMemberView);
    component = fixture.componentInstance;
    component.onTabChange('keys');
    fixture.detectChanges();
    component.onCreateKeyOpen();

    expect(fixture.nativeElement.textContent).toContain('Nueva llave');
    expect(component.dialog).toBe(Dialog.KEY_CREATE);
  });

  it('should create a key and refresh assignments without leaving the keys tab', () => {
    component.onTabChange('keys');
    fixture.detectChanges();
    component.onCreateKeyOpen();
    const key = Object.assign(new Key(), { description: 'Nueva', available: true });
    memberKeyServiceMock.getAll.calls.reset();

    fixture.detectChanges();
    const form = fixture.debugElement.query(By.directive(MemberKeyForm)).componentInstance as MemberKeyForm;

    form.form.patchValue(key);
    form.form.markAsDirty();
    form.onSave();

    expect(memberKeyServiceMock.create).toHaveBeenCalledOnceWith(
      jasmine.objectContaining({
        description: 'Nueva',
        available: true
      })
    );
    expect(memberKeyServiceMock.getAll).toHaveBeenCalledTimes(1);
    expect(component.selectedTab).toBe('keys');
    expect(component.dialog).not.toBe(Dialog.KEY_CREATE);
    expect(component.status.saving).toBeFalse();
  });

  it('should keep the key drawer open after a failed save', () => {
    component.onTabChange('keys');
    fixture.detectChanges();
    component.onCreateKeyOpen();
    memberKeyServiceMock.getAll.calls.reset();
    memberKeyServiceMock.create.and.returnValue(throwError(() => new Error('Save failed')));

    component.onCreateKey(new Key());

    expect(component.dialog).toBe(Dialog.KEY_CREATE);
    expect(component.status.saving).toBeFalse();
    expect(component.error).not.toBe('');
    expect(memberKeyServiceMock.getAll).not.toHaveBeenCalled();
  });

  it('should prevent duplicate key submissions and closing during save', () => {
    const response = new Subject<Key>();
    memberKeyServiceMock.create.and.returnValue(response);
    component.onTabChange('keys');
    fixture.detectChanges();
    component.onCreateKeyOpen();
    const key = new Key();

    component.onCreateKey(key);
    component.onCreateKey(key);
    component.onDrawerVisibleChange(false);

    expect(memberKeyServiceMock.create).toHaveBeenCalledTimes(1);
    expect(component.dialog).toBe(Dialog.KEY_CREATE);
    expect(component.status.saving).toBeTrue();

    response.next(key);
    response.complete();

    expect(component.dialog).not.toBe(Dialog.KEY_CREATE);
    expect(component.status.saving).toBeFalse();
  });

  it('should own the member drawer and load private data by profile number', () => {
    component.onShowMember(Object.assign(new PublicMember(), { number: 12, memberNumber: 37 }));
    fixture.detectChanges();

    expect(component.dialog).toBe(Dialog.INFO);
    expect(memberProfileServiceMock.getOne).toHaveBeenCalledOnceWith(12);
    expect(fixture.nativeElement.querySelector('assoc-member-info')).not.toBeNull();
  });

  it('should not request or edit private data with public member read permission alone', () => {
    authServiceMock.hasPermission.and.callFake(permission => permission === UcroniaPermissions.directory.member.read);
    fixture.destroy();
    fixture = TestBed.createComponent(PublicMemberView);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.onShowMember(Object.assign(new PublicMember(), { number: 12 }));
    component.onShowMemberEdit();
    fixture.detectChanges();

    expect(memberProfileServiceMock.getOne).not.toHaveBeenCalled();
    expect(component.dialog).toBe(Dialog.INFO);
    expect(component.privateMember).toBeNull();
    expect(fixture.nativeElement.textContent).not.toContain('La siguiente información es privada');
  });

  it('should cancel stale private requests when another member is selected or the drawer closes', () => {
    const stale = new Subject<Member>();
    const current = Object.assign(new Member(), { number: 20 });
    memberProfileServiceMock.getOne.and.returnValues(stale, of(current));
    component.onShowMember(Object.assign(new PublicMember(), { number: 12 }));
    component.onShowMember(Object.assign(new PublicMember(), { number: 20 }));
    stale.next(Object.assign(new Member(), { number: 12 }));

    expect(component.privateMember).toBe(current);

    component.onDrawerVisibleChange(false);

    expect(component.privateMember).toBeNull();
    expect(component.dialog).toBe(Dialog.NONE);
  });

  it('should retry private loading from the view after an error', () => {
    memberProfileServiceMock.getOne.and.returnValue(throwError(() => new Error('Failed')));
    component.onShowMember(Object.assign(new PublicMember(), { number: 12 }));

    expect(component.status.memberPrivateError).toBeTrue();
    expect(component.status.loadingMember).toBeFalse();

    memberProfileServiceMock.getOne.and.returnValue(of(new Member()));
    component.loadPrivateMember();

    expect(component.status.memberPrivateError).toBeFalse();
    expect(memberProfileServiceMock.getOne).toHaveBeenCalledTimes(2);
  });

  it('should retain assigned options and submit a full member update from the view', () => {
    const member = Object.assign(new Member(), {
      number: 12,
      memberNumber: 37,
      key: 7,
      feeType: { number: 3, name: 'Assigned fee', amount: 5 },
      contactChannels: [{ method: { number: 8, name: 'Email' }, detail: 'ana@example.org' }]
    });
    memberProfileServiceMock.getOne.and.returnValue(of(member));
    memberProfileServiceMock.update.and.returnValue(of(member));
    component.onShowMember(Object.assign(new PublicMember(), { number: 12 }));
    component.onShowMemberEdit();
    const change: MemberUpdate = {
      name: { firstName: 'Ana', lastName: '' },
      feeType: 3,
      address: '',
      comments: '',
      key: undefined,
      contactChannels: [],
      active: false,
      renew: false
    };

    expect(component.status.optionsReady).toBeTrue();
    expect(component.feeTypes.map(fee => fee.number)).toContain(3);
    expect(component.keys.map(key => key.number)).toContain(7);
    expect(component.contactMethods.map(method => method.number)).toContain(8);

    component.onUpdateMember(change);

    expect(memberProfileServiceMock.update).toHaveBeenCalledOnceWith(12, change);
    expect(component.dialog).toBe(Dialog.NONE);
    expect(component.privateMember).toBeNull();
  });

  it('should retain member edit errors and allow cancelling back to details', () => {
    component.onShowMember(Object.assign(new PublicMember(), { number: 12 }));
    component.onShowMemberEdit();
    memberProfileServiceMock.update.and.returnValue(throwError(() => new Error('Failed')));
    component.onUpdateMember({
      name: { firstName: 'Ana', lastName: '' },
      feeType: 3,
      contactChannels: [],
      active: true,
      renew: true
    });

    expect(component.dialog).toBe(Dialog.EDIT);
    expect(component.status.saving).toBeFalse();
    expect(component.error).not.toBe('');

    component.onCancelMemberEdit();

    expect(component.dialog).toBe(Dialog.INFO);
    expect(component.error).toBe('');
  });

  it('should cancel option loading when member editing is cancelled', () => {
    const options = new Subject<Key[]>();
    memberKeyServiceMock.getAllAvailable.and.returnValue(options);
    component.onShowMember(new PublicMember());
    component.onShowMemberEdit();
    component.onCancelMemberEdit();
    options.next([new Key()]);
    options.complete();

    expect(component.dialog).toBe(Dialog.INFO);
    expect(component.status.optionsReady).toBeFalse();
    expect(component.status.loadingOptions).toBeFalse();
  });

  it('should own key editing and reload assignments on success', () => {
    component.onShowKey({ number: 3, available: false, description: 'Principal' });
    component.onShowKeyEdit();
    fixture.detectChanges();
    const form = fixture.debugElement.query(By.directive(MemberKeyForm)).componentInstance as MemberKeyForm;
    form.form.patchValue({ available: true, description: '' });
    form.form.markAsDirty();
    memberKeyServiceMock.getAll.calls.reset();
    form.onSave();

    expect(memberKeyServiceMock.update).toHaveBeenCalledOnceWith({ number: 3, available: true, description: '' });
    expect(component.dialog).toBe(Dialog.NONE);
    expect(memberKeyServiceMock.getAll).toHaveBeenCalledTimes(1);
  });

  it('should guard key mutations independently of creation permission', () => {
    authServiceMock.hasPermission.and.callFake(
      permission => permission !== UcroniaPermissions.key.update && permission !== UcroniaPermissions.key.delete
    );
    fixture.destroy();
    fixture = TestBed.createComponent(PublicMemberView);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.onShowKey({ number: 3, available: true, description: '' });
    component.onShowKeyEdit();
    component.onUpdateKey(new Key());
    const confirm = spyOn(TestBed.inject(ConfirmationService), 'confirm');
    component.onDeleteKey(new Event('click'));

    expect(component.dialog).toBe(Dialog.KEY_INFO);
    expect(memberKeyServiceMock.update).not.toHaveBeenCalled();
    expect(confirm).not.toHaveBeenCalled();
  });

  it('should confirm key deletion in the view and block duplicate requests while saving', () => {
    const response = new Subject<Key>();
    const confirm = spyOn(TestBed.inject(ConfirmationService), 'confirm');
    memberKeyServiceMock.delete.and.returnValue(response);
    component.onShowKey({ number: 3, available: true, description: '' });
    component.onDeleteKey(new Event('click'));

    expect(memberKeyServiceMock.delete).not.toHaveBeenCalled();

    const confirmation = confirm.calls.mostRecent().args[0];
    confirmation.accept?.();
    confirmation.accept?.();
    component.onDrawerVisibleChange(false);

    expect(memberKeyServiceMock.delete).toHaveBeenCalledOnceWith(3);
    expect(component.dialog).toBe(Dialog.KEY_INFO);
    expect(component.status.saving).toBeTrue();

    response.next(new Key());
    response.complete();

    expect(component.dialog).toBe(Dialog.NONE);
    expect(component.status.saving).toBeFalse();
  });

  it('should keep key details open after a failed deletion', () => {
    const confirm = spyOn(TestBed.inject(ConfirmationService), 'confirm');
    memberKeyServiceMock.delete.and.returnValue(throwError(() => new Error('Failed')));
    component.onShowKey({ number: 3, available: true, description: '' });
    component.onDeleteKey(new Event('click'));
    confirm.calls.mostRecent().args[0].accept?.();

    expect(component.dialog).toBe(Dialog.KEY_INFO);
    expect(component.error).not.toBe('');
    expect(component.status.saving).toBeFalse();
  });

  it('should queue a refresh when keys change during loading', () => {
    const response = new Subject<KeyAssignment[]>();
    const updated: KeyAssignment[] = [{ number: 3, available: true, description: 'New' }];
    memberKeyServiceMock.getAll.calls.reset();
    memberKeyServiceMock.getAll.and.returnValues(response, of(updated));
    component.loadKeys();
    component.loadKeys();
    response.next([]);
    response.complete();

    expect(memberKeyServiceMock.getAll).toHaveBeenCalledTimes(2);
    expect(component.keyAssignments).toEqual(updated);
    expect(component.status.loadingKeys).toBeFalse();
  });

  it('should keep the member form open until the update completes and then close it', () => {
    const response = new Subject<Member>();
    const data: MemberUpdate = {
      feeType: 3,
      name: { firstName: 'Ana', lastName: '' },
      contactChannels: [],
      active: true,
      renew: true
    };
    memberProfileServiceMock.update.and.returnValue(response);
    component.onShowMember(Object.assign(new PublicMember(), { number: 12 }));
    component.onShowMemberEdit();
    memberServiceMock.getAll.calls.reset();

    component.onUpdateMember(data);
    component.onUpdateMember(data);
    component.onDrawerVisibleChange(false);
    response.next(new Member());

    expect(memberProfileServiceMock.update).toHaveBeenCalledOnceWith(12, data);
    expect(component.status.saving).toBeTrue();
    expect(component.dialog).toBe(Dialog.EDIT);
    expect(memberServiceMock.getAll).not.toHaveBeenCalled();

    response.complete();

    expect(component.status.saving).toBeFalse();
    expect(component.dialog).toBe(Dialog.NONE);
    expect(memberServiceMock.getAll).toHaveBeenCalledTimes(1);
  });

  it('should preserve the key edit drawer on failure and use the shared failure handler', () => {
    memberKeyServiceMock.update.and.returnValue(throwError(() => new Error('Failed')));
    component.onShowKey({ number: 3, available: true, description: 'Main' });
    component.onShowKeyEdit();
    memberKeyServiceMock.getAll.calls.reset();

    component.onUpdateKey({ number: 3, available: false, description: '' });

    expect(component.status.saving).toBeFalse();
    expect(component.dialog).toBe(Dialog.KEY_EDIT);
    expect(component.error).toBe('No se pudo actualizar la llave.');
    expect(memberKeyServiceMock.getAll).not.toHaveBeenCalled();
  });

  it('should keep server field failures available to the active form', () => {
    const failure = new FailureResponse({ description: [{ message: 'Too long' }] });
    memberKeyServiceMock.update.and.returnValue(throwError(() => failure));
    component.onShowKey({ number: 3, available: true, description: 'Main' });
    component.onShowKeyEdit();

    component.onUpdateKey({ number: 3, available: true, description: 'Main' });

    expect(component.failures).toBe(failure.failures);
    expect(component.failures.getFailures('description')[0].message).toBe('Too long');
    expect(component.dialog).toBe(Dialog.KEY_EDIT);
    expect(component.status.saving).toBeFalse();
  });

  it('should not run mutation success handling when the view is destroyed during saving', () => {
    const response = new Subject<Key>();
    memberKeyServiceMock.create.and.returnValue(response);
    component.onTabChange('keys');
    component.onCreateKeyOpen();
    component.onCreateKey(new Key());
    memberKeyServiceMock.getAll.calls.reset();

    fixture.destroy();
    response.next(new Key());
    response.complete();

    expect(memberKeyServiceMock.getAll).not.toHaveBeenCalled();
    expect(component.dialog).toBe(Dialog.KEY_CREATE);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
