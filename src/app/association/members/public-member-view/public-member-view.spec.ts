import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ContactMethodService } from '@app/settings/contact-method-service';
import { FeeTypeService } from '@app/settings/fee-type-service';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, Page } from '@bernardo-mg/request';
import { MemberCount, MemberCreation, MemberUpdate } from '@ucronia/api';
import { UcroniaPermissions } from '@ucronia/auth';
import { FeeType, Key, KeyAssignment, Member, MemberStatus, PublicMember } from '@ucronia/domain';
import { ConfirmationService } from '@openng/optimus-ui/api';
import { Drawer } from '@openng/optimus-ui/drawer';
import { Subject, of, throwError } from 'rxjs';
import { MemberKeyForm } from '../member-key-form/member-key-form';
import { MemberKeyService } from '../member-key-service';
import { MemberProfileService } from '../member-profile-service';
import { Dialog } from '../members-dialog';
import { PublicMemberService } from '../public-member-service';
import { PublicMemberView } from './public-member-view';

describe('PublicMemberView', () => {
  let component: PublicMemberView;
  let fixture: ComponentFixture<PublicMemberView>;

  const memberServiceMock = {
    getAll: vi.fn().mockName("MemberService.getAll"), getSummary: vi.fn().mockName("MemberService.getSummary")
};
  const authServiceMock = {
    hasPermission: vi.fn().mockName("AuthService.hasPermission")
};
  const memberProfileServiceMock = {
    create: vi.fn().mockName("MemberProfileService.create"), getOne: vi.fn().mockName("MemberProfileService.getOne"),
    update: vi.fn().mockName("MemberProfileService.update"),
    delete: vi.fn().mockName("MemberProfileService.delete")
};
  const memberKeyServiceMock = {
    getAll: vi.fn().mockName("MemberKeyService.getAll"), create: vi.fn().mockName("MemberKeyService.create"),
    update: vi.fn().mockName("MemberKeyService.update"),
    delete: vi.fn().mockName("MemberKeyService.delete"),
    unassign: vi.fn().mockName("MemberKeyService.unassign")
};
  const feeTypeServiceMock = {
    getAllAvailable: vi.fn().mockName("FeeTypeService.getAllAvailable")
};
  const contactMethodServiceMock = {
    getAllAvailable: vi.fn().mockName("ContactMethodService.getAllAvailable")
};

  beforeEach(async () => {
    authServiceMock.hasPermission.mockReturnValue(true);
    memberProfileServiceMock.delete.mockClear();
    memberProfileServiceMock.delete.mockReturnValue(of(new Member()));
    memberProfileServiceMock.getOne.mockClear();
    memberProfileServiceMock.update.mockClear();
    memberProfileServiceMock.getOne.mockReturnValue(of(new Member()));
    memberProfileServiceMock.update.mockReturnValue(of(new Member()));
    memberKeyServiceMock.update.mockClear();
    memberKeyServiceMock.delete.mockClear();
    memberKeyServiceMock.unassign.mockClear();
    memberKeyServiceMock.update.mockReturnValue(of(new Key()));
    memberKeyServiceMock.delete.mockReturnValue(of(new Key()));
    memberProfileServiceMock.create.mockClear();
    memberProfileServiceMock.create.mockReturnValue(of(new Member()));
    feeTypeServiceMock.getAllAvailable.mockClear();
    contactMethodServiceMock.getAllAvailable.mockClear();
    memberKeyServiceMock.create.mockClear();
    memberKeyServiceMock.create.mockReturnValue(of(new Key()));
    feeTypeServiceMock.getAllAvailable.mockReturnValue(of([]));
    contactMethodServiceMock.getAllAvailable.mockReturnValue(of([]));
    memberKeyServiceMock.getAll.mockClear();
    memberKeyServiceMock.getAll.mockReturnValue(of([]));
    memberServiceMock.getAll.mockReturnValue(of(new Page<PublicMember>()));
    memberServiceMock.getSummary.mockReturnValue(of(new MemberCount()));

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

  it('reloads the first page with the selected status and keeps the name filter', () => {
    component.onFilter('Alice');
    component.load(2);
    memberServiceMock.getAll.mockClear();

    component.onFilterStatus(MemberStatus.Inactive);
    expect(memberServiceMock.getAll).toHaveBeenCalledWith(undefined, expect.anything(), 'Alice', MemberStatus.Inactive);

    component.onFilterStatus(MemberStatus.All);
    expect(memberServiceMock.getAll).toHaveBeenCalledWith(undefined, expect.anything(), 'Alice', MemberStatus.All);
  });

  it('keeps active members as the only option without inactive read permission', () => {
    component.permissions.readInactiveMembers = false;
    fixture.detectChanges();
    memberServiceMock.getAll.mockClear();

    component.onFilterStatus(MemberStatus.Inactive);
    component.onFilterStatus(MemberStatus.All);

    expect(fixture.nativeElement.querySelector('assoc-member-status-selector')).toBeNull();
    expect(component.filterStatus).toBe(MemberStatus.Active);
    expect(memberServiceMock.getAll).not.toHaveBeenCalled();
  });

  it('refreshes the current filtered page and counters', () => {
    component.onFilter('Alice');
    component.data.page = 2;
    const response = Object.assign(new Page<PublicMember>(), {
      page: 2,
      totalPages: 2,
      content: [new PublicMember()]
    });

    memberServiceMock.getAll.mockClear();
    memberServiceMock.getSummary.mockClear();
    memberServiceMock.getAll.mockReturnValue(of(response));
    memberServiceMock.getSummary.mockReturnValue(of({ active: 8, renew: 6 }));
    component.refresh();

    expect(memberServiceMock.getAll).toHaveBeenCalledWith(2, expect.anything(), 'Alice', MemberStatus.Active);
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

    memberServiceMock.getAll.mockClear();
    memberServiceMock.getAll.mockReturnValueOnce(of(empty)).mockReturnValueOnce( of(previous));
    component.refresh();

    expect(vi.mocked(memberServiceMock.getAll).mock.calls.map(args => args[0])).toEqual([3, 2]);
    expect(component.data).toBe(previous);
    expect(component.status.loading).toBe(false);
  });

  it('hides creation and does not load private options without permission', () => {
    authServiceMock.hasPermission.mockReturnValue(false);
    const publicFixture = TestBed.createComponent(PublicMemberView);

    publicFixture.detectChanges();

    expect(publicFixture.nativeElement.textContent).not.toContain('Nuevo socio');

    publicFixture.componentInstance.onCreateOpen();

    expect(feeTypeServiceMock.getAllAvailable).not.toHaveBeenCalled();
    expect(contactMethodServiceMock.getAllAvailable).not.toHaveBeenCalled();
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
    memberServiceMock.getAll.mockClear();
    memberServiceMock.getSummary.mockClear();
    component.onCreate(data);

    expect(memberProfileServiceMock.create).toHaveBeenCalledWith(
      expect.objectContaining({
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
    memberProfileServiceMock.create.mockReturnValue(throwError(() => new Error('Save failed')));
    const data = new MemberCreation(3, '', { firstName: 'Alice', lastName: '' });

    component.onCreate(data);

    expect(component.dialog).toBe(Dialog.CREATE);
    expect(component.status.saving).toBe(false);
    expect(component.error).not.toBe('');
  });

  it('should load keys only when the authorized keys tab is selected', () => {
    expect(memberKeyServiceMock.getAll).not.toHaveBeenCalled();

    component.onTabChange('keys');
    fixture.detectChanges();

    expect(memberKeyServiceMock.getAll).toHaveBeenCalledTimes(1);
  });

  it('should hide the keys tab and reject forced selection without key assignment read permission', () => {
    authServiceMock.hasPermission.mockImplementation(permission => permission !== UcroniaPermissions.keyAssignment.read);
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
    authServiceMock.hasPermission.mockImplementation(permission => permission !== UcroniaPermissions.key.create);
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
    authServiceMock.hasPermission.mockImplementation(
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
    memberKeyServiceMock.getAll.mockClear();

    fixture.detectChanges();
    const form = fixture.debugElement.query(By.directive(MemberKeyForm)).componentInstance as MemberKeyForm;

    form.form.patchValue(key);
    form.form.markAsDirty();
    form.onSave();

    expect(memberKeyServiceMock.create).toHaveBeenCalledTimes(
      1);

      expect(memberKeyServiceMock.create).toHaveBeenCalledWith(expect.objectContaining({
        description: 'Nueva',
        available: true
      })
    );
    expect(memberKeyServiceMock.getAll).toHaveBeenCalledTimes(1);
    expect(component.selectedTab).toBe('keys');
    expect(component.dialog).not.toBe(Dialog.KEY_CREATE);
    expect(component.status.saving).toBe(false);
  });

  it('should keep the key drawer open after a failed save', () => {
    component.onTabChange('keys');
    fixture.detectChanges();
    component.onCreateKeyOpen();
    memberKeyServiceMock.getAll.mockClear();
    memberKeyServiceMock.create.mockReturnValue(throwError(() => new Error('Save failed')));

    component.onCreateKey(new Key());

    expect(component.dialog).toBe(Dialog.KEY_CREATE);
    expect(component.status.saving).toBe(false);
    expect(component.error).not.toBe('');
    expect(memberKeyServiceMock.getAll).not.toHaveBeenCalled();
  });

  it('should prevent duplicate key submissions and closing during save', () => {
    const response = new Subject<Key>();
    memberKeyServiceMock.create.mockReturnValue(response);
    component.onTabChange('keys');
    fixture.detectChanges();
    component.onCreateKeyOpen();
    const key = new Key();

    component.onCreateKey(key);
    component.onCreateKey(key);
    component.onDrawerVisibleChange(false);

    expect(memberKeyServiceMock.create).toHaveBeenCalledTimes(1);
    expect(component.dialog).toBe(Dialog.KEY_CREATE);
    expect(component.status.saving).toBe(true);

    response.next(key);
    response.complete();

    expect(component.dialog).not.toBe(Dialog.KEY_CREATE);
    expect(component.status.saving).toBe(false);
  });

  it('should own the member drawer and load private data by profile number', () => {
    component.onShowMember(Object.assign(new PublicMember(), { number: 12, memberNumber: 37 }));
    fixture.detectChanges();

    expect(component.dialog).toBe(Dialog.INFO);
    expect(memberProfileServiceMock.getOne).toHaveBeenCalledTimes(1);
    expect(memberProfileServiceMock.getOne).toHaveBeenCalledWith(12);
    expect(fixture.nativeElement.querySelector('assoc-member-info')).not.toBeNull();
  });

  it('should not request or edit private data with public member read permission alone', () => {
    authServiceMock.hasPermission.mockImplementation(permission => permission === UcroniaPermissions.directory.member.read);
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
    memberProfileServiceMock.getOne.mockReturnValueOnce(stale).mockReturnValueOnce( of(current));
    component.onShowMember(Object.assign(new PublicMember(), { number: 12 }));
    component.onShowMember(Object.assign(new PublicMember(), { number: 20 }));
    stale.next(Object.assign(new Member(), { number: 12 }));

    expect(component.privateMember).toBe(current);

    component.onDrawerVisibleChange(false);

    expect(component.privateMember).toBeNull();
    expect(component.dialog).toBe(Dialog.NONE);
  });

  it('should retry private loading from the view after an error', () => {
    memberProfileServiceMock.getOne.mockReturnValue(throwError(() => new Error('Failed')));
    component.onShowMember(Object.assign(new PublicMember(), { number: 12 }));

    expect(component.status.memberPrivateError).toBe(true);
    expect(component.status.loadingMember).toBe(false);

    memberProfileServiceMock.getOne.mockReturnValue(of(new Member()));
    component.loadPrivateMember();

    expect(component.status.memberPrivateError).toBe(false);
    expect(memberProfileServiceMock.getOne).toHaveBeenCalledTimes(2);
  });

  it('should retain assigned profile options without loading keys when editing a member', () => {
    const member = Object.assign(new Member(), {
      number: 12,
      memberNumber: 37,
      feeType: { number: 3, name: 'Assigned fee', amount: 5 },
      contactChannels: [{ method: { number: 8, name: 'Email' }, detail: 'ana@example.org' }]
    });
    memberProfileServiceMock.getOne.mockReturnValue(of(member));
    memberProfileServiceMock.update.mockReturnValue(of(member));
    component.onShowMember(Object.assign(new PublicMember(), { number: 12 }));
    component.onShowMemberEdit();
    const change: MemberUpdate = {
      name: { firstName: 'Ana', lastName: '' },
      feeType: 3,
      address: '',
      comments: '',
      contactChannels: [],
      active: false,
      renew: false
    };

    expect(component.status.optionsReady).toBe(true);
    expect(component.feeTypes.map(fee => fee.number)).toContain(3);
    expect(component.contactMethods.map(method => method.number)).toContain(8);

    component.onUpdateMember(change);

    expect(memberProfileServiceMock.update).toHaveBeenCalledTimes(1);

    expect(memberProfileServiceMock.update).toHaveBeenCalledWith(12, change);
    expect(component.dialog).toBe(Dialog.NONE);
    expect(component.privateMember).toBeNull();
  });

  it('should retain member edit errors and allow cancelling back to details', () => {
    component.onShowMember(Object.assign(new PublicMember(), { number: 12 }));
    component.onShowMemberEdit();
    memberProfileServiceMock.update.mockReturnValue(throwError(() => new Error('Failed')));
    component.onUpdateMember({
      name: { firstName: 'Ana', lastName: '' },
      feeType: 3,
      contactChannels: [],
      active: true,
      renew: true
    });

    expect(component.dialog).toBe(Dialog.EDIT);
    expect(component.status.saving).toBe(false);
    expect(component.error).not.toBe('');

    component.onCancelMemberEdit();

    expect(component.dialog).toBe(Dialog.INFO);
    expect(component.error).toBe('');
  });

  it('should cancel option loading when member editing is cancelled', () => {
    const options = new Subject<FeeType[]>();
    feeTypeServiceMock.getAllAvailable.mockReturnValue(options);
    component.onShowMember(new PublicMember());
    component.onShowMemberEdit();
    component.onCancelMemberEdit();
    options.next([]);
    options.complete();

    expect(component.dialog).toBe(Dialog.INFO);
    expect(component.status.optionsReady).toBe(false);
    expect(component.status.loadingOptions).toBe(false);
  });

  it('should own key editing and reload assignments on success', () => {
    component.onShowKey({ number: 3, available: false, description: 'Principal' });
    component.onShowKeyEdit();
    fixture.detectChanges();
    const form = fixture.debugElement.query(By.directive(MemberKeyForm)).componentInstance as MemberKeyForm;
    form.form.patchValue({ available: true, description: '' });
    form.form.markAsDirty();
    memberKeyServiceMock.getAll.mockClear();
    form.onSave();

    expect(memberKeyServiceMock.update).toHaveBeenCalledTimes(1);

    expect(memberKeyServiceMock.update).toHaveBeenCalledWith({ number: 3, available: true, description: '' });
    expect(component.dialog).toBe(Dialog.NONE);
    expect(memberKeyServiceMock.getAll).toHaveBeenCalledTimes(1);
  });

  it('should guard key mutations independently of creation permission', () => {
    authServiceMock.hasPermission.mockImplementation(
      permission => permission !== UcroniaPermissions.key.update && permission !== UcroniaPermissions.key.delete
    );
    fixture.destroy();
    fixture = TestBed.createComponent(PublicMemberView);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.onShowKey({ number: 3, available: true, description: '' });
    component.onShowKeyEdit();
    component.onUpdateKey(new Key());
    const confirm = vi.spyOn(TestBed.inject(ConfirmationService), 'confirm').mockReturnThis();
    component.onDeleteKey(new Event('click'));

    expect(component.dialog).toBe(Dialog.KEY_INFO);
    expect(memberKeyServiceMock.update).not.toHaveBeenCalled();
    expect(confirm).not.toHaveBeenCalled();
  });

  it('should confirm key deletion in the view and block duplicate requests while saving', () => {
    const response = new Subject<Key>();
    const confirm = vi.spyOn(TestBed.inject(ConfirmationService), 'confirm').mockReturnThis();
    memberKeyServiceMock.delete.mockReturnValue(response);
    component.onShowKey({ number: 3, available: true, description: '' });
    component.onDeleteKey(new Event('click'));

    expect(memberKeyServiceMock.delete).not.toHaveBeenCalled();

    const confirmation = vi.mocked(confirm).mock.lastCall![0];
    confirmation.accept?.();
    confirmation.accept?.();
    component.onDrawerVisibleChange(false);

    expect(memberKeyServiceMock.delete).toHaveBeenCalledTimes(1);

    expect(memberKeyServiceMock.delete).toHaveBeenCalledWith(3);
    expect(component.dialog).toBe(Dialog.KEY_INFO);
    expect(component.status.saving).toBe(true);

    response.next(new Key());
    response.complete();

    expect(component.dialog).toBe(Dialog.NONE);
    expect(component.status.saving).toBe(false);
  });

  it('should keep key details open after a failed deletion', () => {
    const confirm = vi.spyOn(TestBed.inject(ConfirmationService), 'confirm').mockReturnThis();
    memberKeyServiceMock.delete.mockReturnValue(throwError(() => new Error('Failed')));
    component.onShowKey({ number: 3, available: true, description: '' });
    component.onDeleteKey(new Event('click'));
    vi.mocked(confirm).mock.lastCall![0].accept?.();

    expect(component.dialog).toBe(Dialog.KEY_INFO);
    expect(component.error).not.toBe('');
    expect(component.status.saving).toBe(false);
  });

  it('confirms removing an assignment and reloads the key as unassigned', () => {
    const confirm = vi.spyOn(TestBed.inject(ConfirmationService), 'confirm').mockReturnThis();
    const key: KeyAssignment = { number: 3, available: true, description: 'Principal' };
    const response = new Subject<KeyAssignment>();
    memberKeyServiceMock.unassign.mockReturnValue(response);
    memberKeyServiceMock.getAll.mockReturnValue(of([key]));
    component.onShowKey({ ...key, profile: { number: 12, name: 'Ana' } });

    component.onUnassignKey(new Event('click'));
    expect(memberKeyServiceMock.unassign).not.toHaveBeenCalled();

    const confirmation = vi.mocked(confirm).mock.lastCall![0];
    confirmation.accept?.();
    confirmation.accept?.();
    expect(memberKeyServiceMock.unassign).toHaveBeenCalledTimes(1);
    expect(memberKeyServiceMock.unassign).toHaveBeenCalledWith(3);
    expect(memberKeyServiceMock.delete).not.toHaveBeenCalled();

    response.next(key);
    response.complete();
    expect(component.keyAssignments).toEqual([key]);
    expect(component.dialog).toBe(Dialog.NONE);
  });

  it('does not remove assignments for an unassigned key or without permission', () => {
    const confirm = vi.spyOn(TestBed.inject(ConfirmationService), 'confirm').mockReturnThis();
    const key: KeyAssignment = { number: 3, available: true, description: 'Principal' };
    component.onShowKey(key);
    expect(component.canUnassignKey).toBe(false);
    component.onUnassignKey(new Event('click'));

    component.permissions.keyAssignmentsDelete = false;
    component.onShowKey({ ...key, profile: { number: 12, name: 'Ana' } });
    expect(component.canUnassignKey).toBe(false);
    component.onUnassignKey(new Event('click'));

    expect(confirm).not.toHaveBeenCalled();
    expect(memberKeyServiceMock.unassign).not.toHaveBeenCalled();
  });

  it('keeps the assigned profile visible when removal fails', () => {
    const confirm = vi.spyOn(TestBed.inject(ConfirmationService), 'confirm').mockReturnThis();
    const key: KeyAssignment = {
      number: 3, available: true, description: 'Principal', profile: { number: 12, name: 'Ana' }
    };
    memberKeyServiceMock.unassign.mockReturnValue(throwError(() => new Error('Failed')));
    component.onShowKey(key);
    component.onUnassignKey(new Event('click'));
    vi.mocked(confirm).mock.lastCall![0].accept?.();

    expect(component.selectedKey).toBe(key);
    expect(component.dialog).toBe(Dialog.KEY_INFO);
    expect(component.error).toBe('No se pudo quitar la asignación de la llave.');
    expect(component.status.saving).toBe(false);
  });

  it('should queue a refresh when keys change during loading', () => {
    const response = new Subject<KeyAssignment[]>();
    const updated: KeyAssignment[] = [{ number: 3, available: true, description: 'New' }];
    memberKeyServiceMock.getAll.mockClear();
    memberKeyServiceMock.getAll.mockReturnValueOnce(response).mockReturnValueOnce( of(updated));
    component.loadKeys();
    component.loadKeys();
    response.next([]);
    response.complete();

    expect(memberKeyServiceMock.getAll).toHaveBeenCalledTimes(2);
    expect(component.keyAssignments).toEqual(updated);
    expect(component.status.loadingKeys).toBe(false);
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
    memberProfileServiceMock.update.mockReturnValue(response);
    component.onShowMember(Object.assign(new PublicMember(), { number: 12 }));
    component.onShowMemberEdit();
    memberServiceMock.getAll.mockClear();

    component.onUpdateMember(data);
    component.onUpdateMember(data);
    component.onDrawerVisibleChange(false);
    response.next(new Member());

    expect(memberProfileServiceMock.update).toHaveBeenCalledTimes(1);

    expect(memberProfileServiceMock.update).toHaveBeenCalledWith(12, data);
    expect(component.status.saving).toBe(true);
    expect(component.dialog).toBe(Dialog.EDIT);
    expect(memberServiceMock.getAll).not.toHaveBeenCalled();

    response.complete();

    expect(component.status.saving).toBe(false);
    expect(component.dialog).toBe(Dialog.NONE);
    expect(memberServiceMock.getAll).toHaveBeenCalledTimes(1);
  });

  it('should preserve the key edit drawer on failure and use the shared failure handler', () => {
    memberKeyServiceMock.update.mockReturnValue(throwError(() => new Error('Failed')));
    component.onShowKey({ number: 3, available: true, description: 'Main' });
    component.onShowKeyEdit();
    memberKeyServiceMock.getAll.mockClear();

    component.onUpdateKey({ number: 3, available: false, description: '' });

    expect(component.status.saving).toBe(false);
    expect(component.dialog).toBe(Dialog.KEY_EDIT);
    expect(component.error).toBe('No se pudo actualizar la llave.');
    expect(memberKeyServiceMock.getAll).not.toHaveBeenCalled();
  });

  it('should keep server field failures available to the active form', () => {
    const failure = new FailureResponse({ description: [{ message: 'Too long' }] });
    memberKeyServiceMock.update.mockReturnValue(throwError(() => failure));
    component.onShowKey({ number: 3, available: true, description: 'Main' });
    component.onShowKeyEdit();

    component.onUpdateKey({ number: 3, available: true, description: 'Main' });

    expect(component.failures).toBe(failure.failures);
    expect(component.failures.getFailures('description')[0].message).toBe('Too long');
    expect(component.dialog).toBe(Dialog.KEY_EDIT);
    expect(component.status.saving).toBe(false);
  });

  it('should not run mutation success handling when the view is destroyed during saving', () => {
    const response = new Subject<Key>();
    memberKeyServiceMock.create.mockReturnValue(response);
    component.onTabChange('keys');
    component.onCreateKeyOpen();
    component.onCreateKey(new Key());
    memberKeyServiceMock.getAll.mockClear();

    fixture.destroy();
    response.next(new Key());
    response.complete();

    expect(memberKeyServiceMock.getAll).not.toHaveBeenCalled();
    expect(component.dialog).toBe(Dialog.KEY_CREATE);
  });

  it('should confirm member deletion using the standard footer action', () => {
    const confirm = vi.spyOn(TestBed.inject(ConfirmationService), 'confirm').mockReturnThis();
    component.onShowMember(Object.assign(new PublicMember(), { number: 12, memberNumber: 37 }));
    fixture.detectChanges();
    const action = fixture.nativeElement.querySelector('[data-action="delete"] button') as HTMLButtonElement;

    expect(action).not.toBeNull();

    action.click();

    expect(memberProfileServiceMock.delete).not.toHaveBeenCalled();
    const confirmation = vi.mocked(confirm).mock.lastCall![0];

    expect(confirmation.target).toBe(action);
    expect(confirmation.rejectButtonProps?.label).toBe('Cancelar');
    expect(confirmation.acceptButtonProps?.label).toBe('Borrar');

    memberServiceMock.getAll.mockClear();
    memberServiceMock.getSummary.mockClear();
    memberKeyServiceMock.getAll.mockClear();
    confirmation.accept?.();

    expect(memberProfileServiceMock.delete).toHaveBeenCalledTimes(1);

    expect(memberProfileServiceMock.delete).toHaveBeenCalledWith(12);
    expect(component.dialog).toBe(Dialog.NONE);
    expect(memberServiceMock.getAll).toHaveBeenCalledTimes(1);
    expect(memberServiceMock.getSummary).toHaveBeenCalledTimes(1);
    expect(memberKeyServiceMock.getAll).toHaveBeenCalledTimes(1);
    expect(component.status.saving).toBe(false);
  });

  it('should hide member deletion and reject forced deletion without its permission', () => {
    authServiceMock.hasPermission.mockImplementation(
      permission => permission !== UcroniaPermissions.directory.memberProfile.delete
    );
    fixture.destroy();
    fixture = TestBed.createComponent(PublicMemberView);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const confirm = vi.spyOn(TestBed.inject(ConfirmationService), 'confirm').mockReturnThis();
    component.onShowMember(Object.assign(new PublicMember(), { number: 12 }));
    fixture.detectChanges();
    component.onDeleteMember(new Event('click'));

    expect(fixture.nativeElement.querySelector('[data-action="delete"]')).toBeNull();
    expect(confirm).not.toHaveBeenCalled();
    expect(memberProfileServiceMock.delete).not.toHaveBeenCalled();
  });

  it('should allow deletion without private profile read, edit or key read permission', () => {
    authServiceMock.hasPermission.mockImplementation(
      permission =>
        permission === UcroniaPermissions.directory.member.read ||
        permission === UcroniaPermissions.directory.memberProfile.delete
    );
    fixture.destroy();
    fixture = TestBed.createComponent(PublicMemberView);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const confirm = vi.spyOn(TestBed.inject(ConfirmationService), 'confirm').mockReturnThis();
    component.onShowMember(Object.assign(new PublicMember(), { number: 12, memberNumber: 37 }));
    component.onDeleteMember(new Event('click'));
    memberKeyServiceMock.getAll.mockClear();
    vi.mocked(confirm).mock.lastCall![0].accept?.();

    expect(memberProfileServiceMock.getOne).not.toHaveBeenCalled();
    expect(memberProfileServiceMock.delete).toHaveBeenCalledTimes(1);
    expect(memberProfileServiceMock.delete).toHaveBeenCalledWith(12);
    expect(memberKeyServiceMock.getAll).not.toHaveBeenCalled();
    expect(component.dialog).toBe(Dialog.NONE);
  });

  it('should keep the member drawer open after deletion fails and allow retry', () => {
    const confirm = vi.spyOn(TestBed.inject(ConfirmationService), 'confirm').mockReturnThis();
    memberProfileServiceMock.delete.mockReturnValue(throwError(() => new Error('Failed')));
    component.onShowMember(Object.assign(new PublicMember(), { number: 12 }));
    memberServiceMock.getAll.mockClear();
    memberKeyServiceMock.getAll.mockClear();
    component.onDeleteMember(new Event('click'));
    vi.mocked(confirm).mock.lastCall![0].accept?.();
    fixture.detectChanges();

    expect(component.dialog).toBe(Dialog.INFO);
    expect(component.status.saving).toBe(false);
    expect(fixture.nativeElement.textContent).toContain('No se pudo borrar el socio');
    expect(memberServiceMock.getAll).not.toHaveBeenCalled();
    expect(memberKeyServiceMock.getAll).not.toHaveBeenCalled();

    memberProfileServiceMock.delete.mockReturnValue(of(new Member()));
    component.onDeleteMember(new Event('click'));
    vi.mocked(confirm).mock.lastCall![0].accept?.();

    expect(component.dialog).toBe(Dialog.NONE);
    expect(memberProfileServiceMock.delete).toHaveBeenCalledTimes(2);
  });

  it('should prevent duplicate member deletions and closing before completion', () => {
    const response = new Subject<Member>();
    const confirm = vi.spyOn(TestBed.inject(ConfirmationService), 'confirm').mockReturnThis();
    memberProfileServiceMock.delete.mockReturnValue(response);
    component.onShowMember(Object.assign(new PublicMember(), { number: 12 }));
    component.onDeleteMember(new Event('click'));
    const confirmation = vi.mocked(confirm).mock.lastCall![0];
    confirmation.accept?.();
    confirmation.accept?.();
    component.onDeleteMember(new Event('click'));
    component.onDrawerVisibleChange(false);

    expect(memberProfileServiceMock.delete).toHaveBeenCalledTimes(1);

    expect(memberProfileServiceMock.delete).toHaveBeenCalledWith(12);
    expect(confirm).toHaveBeenCalledTimes(1);
    expect(component.dialog).toBe(Dialog.INFO);
    expect(component.status.saving).toBe(true);

    response.next(new Member());
    response.complete();

    expect(component.dialog).toBe(Dialog.NONE);
    expect(component.status.saving).toBe(false);
  });

  it('should ignore a delete confirmation for a member that is no longer selected', () => {
    const confirm = vi.spyOn(TestBed.inject(ConfirmationService), 'confirm').mockReturnThis();
    component.onShowMember(Object.assign(new PublicMember(), { number: 12 }));
    component.onDeleteMember(new Event('click'));
    const confirmation = vi.mocked(confirm).mock.lastCall![0];
    component.onShowMember(Object.assign(new PublicMember(), { number: 20 }));
    confirmation.accept?.();

    expect(memberProfileServiceMock.delete).not.toHaveBeenCalled();
  });

  it('should ignore a delete confirmation accepted after leaving the view', () => {
    const confirm = vi.spyOn(TestBed.inject(ConfirmationService), 'confirm').mockReturnThis();
    component.onShowMember(Object.assign(new PublicMember(), { number: 12 }));
    component.onDeleteMember(new Event('click'));
    const confirmation = vi.mocked(confirm).mock.lastCall![0];
    fixture.destroy();
    confirmation.accept?.();

    expect(memberProfileServiceMock.delete).not.toHaveBeenCalled();
  });

  it('should allow member editing without key permissions', () => {
    authServiceMock.hasPermission.mockImplementation(
      permission => permission !== UcroniaPermissions.key.read && permission !== UcroniaPermissions.keyAssignment.read
    );
    const restrictedFixture = TestBed.createComponent(PublicMemberView);
    const restricted = restrictedFixture.componentInstance;
    restrictedFixture.detectChanges();

    restricted.onShowMember(Object.assign(new PublicMember(), { number: 12 }));
    restricted.onShowMemberEdit();

    expect(restricted.dialog).toBe(Dialog.EDIT);
    expect(restricted.status.optionsReady).toBe(true);
    expect(memberKeyServiceMock.getAll).not.toHaveBeenCalled();

    restrictedFixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load assignments with assignment read permission even without key read permission', () => {
    authServiceMock.hasPermission.mockImplementation(permission => permission !== UcroniaPermissions.key.read);
    const authorizedFixture = TestBed.createComponent(PublicMemberView);

    authorizedFixture.detectChanges();
    authorizedFixture.componentInstance.onTabChange('keys');
    authorizedFixture.detectChanges();

    expect(authorizedFixture.nativeElement.querySelector('p-tab[value="keys"]')).not.toBeNull();
    expect(memberKeyServiceMock.getAll).toHaveBeenCalledTimes(1);

    authorizedFixture.destroy();
  });
  it('should cancel member and summary loading when the view is destroyed', () => {
    const members = new Subject<Page<PublicMember>>();
    const summary = new Subject<MemberCount>();
    memberServiceMock.getAll.mockReturnValue(members);
    memberServiceMock.getSummary.mockReturnValue(summary);
    component.refresh();

    fixture.destroy();

    expect(members.observed).toBe(false);
    expect(summary.observed).toBe(false);
    expect(component.status.loading).toBe(false);
    expect(component.status.loadingSummary).toBe(false);
  });

});

describe('PublicMemberView - assign key', () => {
  let fixture: ComponentFixture<PublicMemberView>;
  let component: PublicMemberView;

  const authServiceMock = {
    hasPermission: vi.fn().mockName("AuthService.hasPermission")
};
  const memberServiceMock = {
    getAll: vi.fn().mockName("PublicMemberService.getAll"), getSummary: vi.fn().mockName("PublicMemberService.getSummary"), searchMembers: vi.fn().mockName("PublicMemberService.searchMembers")
};
  const keyServiceMock = {
    getAll: vi.fn().mockName("MemberKeyService.getAll"), assign: vi.fn().mockName("MemberKeyService.assign"), reassign: vi.fn().mockName("MemberKeyService.reassign")
};
  const profileServiceMock = {
    getOne: vi.fn().mockName("MemberProfileService.getOne")
};
  const feeTypeServiceMock = {
    getAllAvailable: vi.fn().mockName("FeeTypeService.getAllAvailable")
};
  const contactMethodServiceMock = {
    getAllAvailable: vi.fn().mockName("ContactMethodService.getAllAvailable")
};
  const member = Object.assign(new PublicMember(), { number: 12, memberNumber: 37, name: { fullName: 'Ana López' } });
  const other = Object.assign(new PublicMember(), { number: 15, memberNumber: 42, name: { fullName: 'Luis García' } });
  const key: KeyAssignment = { number: 7, available: true, description: 'Principal' };
  const assigned: KeyAssignment = { ...key, profile: { number: 12, name: 'Ana López' } };

  beforeEach(async () => {
    authServiceMock.hasPermission.mockReturnValue(true);
    memberServiceMock.searchMembers.mockClear();
    memberServiceMock.searchMembers.mockReturnValue(of([member]));
    memberServiceMock.getAll.mockReturnValue(of(new Page<PublicMember>()));
    memberServiceMock.getSummary.mockReturnValue(of(new MemberCount()));
    keyServiceMock.getAll.mockClear();
    keyServiceMock.getAll.mockReturnValue(of([assigned]));
    keyServiceMock.assign.mockClear();
    keyServiceMock.reassign.mockClear();
    keyServiceMock.reassign.mockReturnValue(of({ ...key, profile: { number: 15, name: 'Luis García' } }));
    keyServiceMock.assign.mockReturnValue(of(assigned));
    profileServiceMock.getOne.mockClear();

    await TestBed.configureTestingModule({
      imports: [PublicMemberView],
      providers: [
        provideNoopAnimations(),
        ConfirmationService,
        { provide: AuthService, useValue: authServiceMock },
        { provide: PublicMemberService, useValue: memberServiceMock },
        { provide: MemberKeyService, useValue: keyServiceMock },
        { provide: MemberProfileService, useValue: profileServiceMock },
        { provide: FeeTypeService, useValue: feeTypeServiceMock },
        { provide: ContactMethodService, useValue: contactMethodServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PublicMemberView);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.onShowKey(key);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('opens the member selector from an unassigned key without loading private profiles', () => {
    const button = assignmentButton(fixture);

    expect(button,'the visible drawer must offer assignment for an unassigned key').toBeDefined();
    button?.click();
    fixture.detectChanges();

    expect(component.dialog).toBe(Dialog.KEY_ASSIGN);
    expect(component.assignmentMembers).toEqual([]);
    expect(memberServiceMock.searchMembers).not.toHaveBeenCalled();
    component.loadAssignmentMembers('Ana');
    expect(component.assignmentMembers).toEqual([member]);
    expect(memberServiceMock.searchMembers).toHaveBeenCalledTimes(1);
    expect(memberServiceMock.searchMembers).toHaveBeenCalledWith('Ana');
    expect(profileServiceMock.getOne).not.toHaveBeenCalled();
  });

  it('saves the assignment through the drawer footer using native form submission', async () => {
    component.onShowKeyAssignment();
    component.loadAssignmentMembers('Ana');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const drawer = fixture.debugElement.query(By.directive(Drawer)).componentInstance as Drawer;
    const footer = drawer.container?.querySelector('[data-pc-section="footer"]');
    const submit = footer?.querySelector<HTMLButtonElement>('button[data-action="submit"]');
    const form = component.fieldsKeyAssignmentForm();

    expect(submit,'the assignment drawer must render a submit action in its footer').toBeTruthy();
    expect(submit?.form?.id).toBe('public-member-view-assign-key');
    expect(submit?.disabled).toBe(true);
    expect(form).toBeDefined();
    if (!form || !submit) {
      return;
    }
    form.form.patchValue({ profile: 12 });
    form.form.get('profile')?.markAsDirty();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(submit.disabled).toBe(false);
    submit.click();
    fixture.detectChanges();

    expect(keyServiceMock.assign).toHaveBeenCalledTimes(1);

    expect(keyServiceMock.assign).toHaveBeenCalledWith(7, 12);
    expect(component.dialog).toBe(Dialog.NONE);
  });

  it('cancels assignment through the drawer footer without saving', async () => {
    component.onShowKeyAssignment();
    component.loadAssignmentMembers('Ana');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const drawer = fixture.debugElement.query(By.directive(Drawer)).componentInstance as Drawer;
    const footer = drawer.container?.querySelector('[data-pc-section="footer"]');
    const cancel = footer?.querySelector<HTMLButtonElement>('button[data-action="cancel"]');

    expect(cancel,'the assignment drawer must render a cancel action in its footer').toBeTruthy();
    cancel?.click();
    fixture.detectChanges();

    expect(keyServiceMock.assign).not.toHaveBeenCalled();
    expect(component.dialog).toBe(Dialog.KEY_INFO);
  });

  it('keeps the footer connected to the key editing form when switching drawer modes', async () => {
    component.onShowKeyEdit();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const drawer = fixture.debugElement.query(By.directive(Drawer)).componentInstance as Drawer;
    const footer = drawer.container?.querySelector('[data-pc-section="footer"]');
    const submit = footer?.querySelector<HTMLButtonElement>('button[data-action="submit"]');

    expect(submit?.form?.id).toBe('public-member-view-edit-key');
    expect(submit?.disabled).toBe(true);
    expect(component.fieldsKeyEditForm()).toBeDefined();
  });

  it('hides and rejects assignment without assignment creation permission', async () => {
    authServiceMock.hasPermission.mockImplementation(permission => permission !== UcroniaPermissions.keyAssignment.create);
    const restrictedFixture = TestBed.createComponent(PublicMemberView);
    const restricted = restrictedFixture.componentInstance;
    restricted.onShowKey(key);
    restrictedFixture.detectChanges();
    await restrictedFixture.whenStable();
    restrictedFixture.detectChanges();

    restricted.onShowKeyAssignment();
    restricted.onAssignKey(12);

    expect(assignmentButton(restrictedFixture)).toBeUndefined();
    expect(memberServiceMock.searchMembers).not.toHaveBeenCalled();
    expect(keyServiceMock.assign).not.toHaveBeenCalled();
    restrictedFixture.destroy();
  });

  it('does not load member choices without public member read permission', () => {
    authServiceMock.hasPermission.mockImplementation(permission => permission !== UcroniaPermissions.directory.member.read);
    const restrictedFixture = TestBed.createComponent(PublicMemberView);
    const restricted = restrictedFixture.componentInstance;
    restricted.onShowKey(key);
    restrictedFixture.detectChanges();

    restricted.onShowKeyAssignment();

    expect(restricted.dialog).toBe(Dialog.KEY_INFO);
    expect(memberServiceMock.searchMembers).not.toHaveBeenCalled();
    restrictedFixture.destroy();
  });

  it('reassigns an assigned key through the drawer footer and refreshes the list', async () => {
    memberServiceMock.searchMembers.mockReturnValue(of([member, other]));
    component.selectedTab = 'keys';
    component.onShowKey(assigned);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const drawer = fixture.debugElement.query(By.directive(Drawer)).componentInstance as Drawer;
    const button = Array.from(drawer.container?.querySelectorAll<HTMLButtonElement>('button') ?? [])
      .find(action => action.textContent?.trim() === 'Cambiar socio');

    expect(button).toBeDefined();
    button?.click();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const form = component.fieldsKeyAssignmentForm();
    const submit = drawer.container?.querySelector<HTMLButtonElement>('[data-pc-section="footer"] button[data-action="submit"]');

    form?.searchMember.emit({ query: 'Luis' });
    fixture.detectChanges();
    expect(component.assignmentMembers).toEqual([member, other]);
    expect(submit?.form?.id).toBe('public-member-view-assign-key');
    expect(submit?.textContent).toContain('Reasignar llave');
    expect(form).toBeDefined();
    expect(submit).toBeTruthy();
    if (!form || !submit) {
      return;
    }
    form.onSelectMember(other);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(submit.disabled).toBe(false);
    submit.click();
    fixture.detectChanges();

    expect(keyServiceMock.reassign).toHaveBeenCalledTimes(1);

    expect(keyServiceMock.reassign).toHaveBeenCalledWith(7, 15);
    expect(keyServiceMock.assign).not.toHaveBeenCalled();
    expect(keyServiceMock.getAll).toHaveBeenCalledTimes(1);
    expect(component.dialog).toBe(Dialog.NONE);
    expect(component.selectedTab).toBe('keys');
  });

  it('allows reassignment with update permission and without creation permission', () => {
    component.permissions.keyAssignmentsCreate = false;
    memberServiceMock.searchMembers.mockReturnValue(of([member, other]));
    component.onShowKey(assigned);

    component.onShowKeyAssignment();
    component.loadAssignmentMembers('Ana');
    component.onAssignKey(15);

    expect(keyServiceMock.reassign).toHaveBeenCalledTimes(1);

    expect(keyServiceMock.reassign).toHaveBeenCalledWith(7, 15);
    expect(keyServiceMock.assign).not.toHaveBeenCalled();
  });

  it('hides and rejects reassignment without assignment update permission', async () => {
    component.permissions.keyAssignmentsEdit = false;
    component.onShowKey(assigned);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const drawer = fixture.debugElement.query(By.directive(Drawer)).componentInstance as Drawer;

    expect(drawer.container?.textContent).not.toContain('Cambiar socio');
    component.onShowKeyAssignment();
    component.loadAssignmentMembers('Ana');
    component.dialog = Dialog.KEY_ASSIGN;
    component.assignmentMembers = [other];
    component.onAssignKey(15);

    expect(memberServiceMock.searchMembers).not.toHaveBeenCalled();
    expect(keyServiceMock.reassign).not.toHaveBeenCalled();
    expect(keyServiceMock.assign).not.toHaveBeenCalled();
  });

  it('rejects reassigning the key to its current profile', () => {
    memberServiceMock.searchMembers.mockReturnValue(of([member, other]));
    component.onShowKey(assigned);
    component.onShowKeyAssignment();
    component.loadAssignmentMembers('Ana');

    component.onAssignKey(12);

    expect(keyServiceMock.reassign).not.toHaveBeenCalled();
    expect(keyServiceMock.assign).not.toHaveBeenCalled();
  });

  it('preserves the drawer and choices when reassignment fails', () => {
    memberServiceMock.searchMembers.mockReturnValue(of([member, other]));
    keyServiceMock.reassign.mockReturnValue(throwError(() => new Error('Unavailable')));
    component.onShowKey(assigned);
    component.onShowKeyAssignment();
    component.loadAssignmentMembers('Ana');

    component.onAssignKey(15);

    expect(component.dialog).toBe(Dialog.KEY_ASSIGN);
    expect(component.assignmentMembers).toEqual([member, other]);
    expect(component.selectedKey).toEqual(assigned);
    expect(component.status.saving).toBe(false);
    expect(component.error).not.toBe('');
    expect(keyServiceMock.getAll).not.toHaveBeenCalled();
  });

  it('assigns by profile number and refreshes the key list on the same tab', () => {
    component.selectedTab = 'keys';
    component.onShowKeyAssignment();
    component.loadAssignmentMembers('Ana');

    component.onAssignKey(37);
    expect(keyServiceMock.assign).not.toHaveBeenCalled();
    component.onAssignKey(12);

    expect(keyServiceMock.assign).toHaveBeenCalledTimes(1);

    expect(keyServiceMock.assign).toHaveBeenCalledWith(7, 12);
    expect(keyServiceMock.getAll).toHaveBeenCalledTimes(1);
    expect(component.keyAssignments).toEqual([assigned]);
    expect(component.dialog).toBe(Dialog.NONE);
    expect(component.selectedTab).toBe('keys');
  });

  it('retains the form and member choices when assignment fails', () => {
    keyServiceMock.assign.mockReturnValue(throwError(() => new Error('Conflict')));
    component.onShowKeyAssignment();
    component.loadAssignmentMembers('Ana');

    component.onAssignKey(12);

    expect(component.dialog).toBe(Dialog.KEY_ASSIGN);
    expect(component.assignmentMembers).toEqual([member]);
    expect(component.error).not.toBe('');
    expect(component.status.saving).toBe(false);
    expect(keyServiceMock.getAll).not.toHaveBeenCalled();
  });

  it('cancels member loading and ignores late responses when returning to key details', () => {
    const pending = new Subject<PublicMember[]>();
    memberServiceMock.searchMembers.mockReturnValue(pending);
    component.onShowKeyAssignment();
    component.loadAssignmentMembers('Ana');
    component.onAssignKey(12);

    expect(keyServiceMock.assign).not.toHaveBeenCalled();
    component.onCancelKeyAssignment();
    pending.next([member]);

    expect(component.dialog).toBe(Dialog.KEY_INFO);
    expect(component.assignmentMembers).toEqual([]);
    expect(component.status.loadingAssignmentMembers).toBe(false);
    expect(pending.observed).toBe(false);
  });

  it('allows retrying failed member loading before assigning', () => {
    memberServiceMock.searchMembers.mockReturnValue(throwError(() => new Error('Unavailable')));
    component.onShowKeyAssignment();
    component.loadAssignmentMembers('Ana');
    component.onAssignKey(12);

    expect(component.status.assignmentMembersError).toBe(true);
    expect(keyServiceMock.assign).not.toHaveBeenCalled();

    memberServiceMock.searchMembers.mockReturnValue(of([member]));
    component.loadAssignmentMembers();

    expect(component.status.assignmentMembersError).toBe(false);
    expect(component.assignmentMembers).toEqual([member]);
  });

  it('cancels an older search and ignores its late results', () => {
    const pending = new Subject<PublicMember[]>();
    memberServiceMock.searchMembers.mockReturnValue(pending);
    component.onShowKeyAssignment();
    component.loadAssignmentMembers('Ana');
    memberServiceMock.searchMembers.mockReturnValue(of([other]));

    component.loadAssignmentMembers('Luis');
    pending.next([member]);

    expect(pending.observed).toBe(false);
    expect(component.assignmentMembers).toEqual([other]);
    expect(memberServiceMock.searchMembers).toHaveBeenCalledWith('Luis');
  });

  it('clears suggestions without requesting members for a blank search', () => {
    component.onShowKeyAssignment();
    component.assignmentMembers = [member];

    component.loadAssignmentMembers('   ');

    expect(component.assignmentMembers).toEqual([]);
    expect(memberServiceMock.searchMembers).not.toHaveBeenCalled();
  });

  function assignmentButton(viewFixture: ComponentFixture<PublicMemberView>): HTMLButtonElement | undefined {
    const drawer = viewFixture.debugElement.query(By.directive(Drawer)).componentInstance as Drawer;
    const buttons = drawer.container?.querySelectorAll<HTMLButtonElement>('button') ?? [];

    return Array.from(buttons).find(button => button.textContent?.trim() === 'Asignar socio');
  }

});
