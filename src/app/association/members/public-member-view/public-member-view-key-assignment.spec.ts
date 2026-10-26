import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ContactMethodService } from '@app/settings/contact-method-service';
import { FeeTypeService } from '@app/settings/fee-type-service';
import { editForm } from '@app/testing/form-test-helpers';
import { AuthService } from '@bernardo-mg/authentication';
import { Page } from '@bernardo-mg/request';
import { MemberCount } from '@ucronia/api';
import { UcroniaPermissions } from '@ucronia/auth';
import { KeyAssignment, PublicMember } from '@ucronia/domain';
import { ConfirmationService } from 'primeng/api';
import { Drawer } from 'primeng/drawer';
import { of, Subject, throwError } from 'rxjs';
import { MemberKeyService } from '../member-key-service';
import { MemberProfileService } from '../member-profile-service';
import { Dialog } from '../members-dialog';
import { PublicMemberService } from '../public-member-service';
import { PublicMemberView } from './public-member-view';

describe('PublicMemberView - assign key', () => {
  let fixture: ComponentFixture<PublicMemberView>;
  let component: PublicMemberView;

  const authServiceMock = jasmine.createSpyObj<AuthService>('AuthService', ['hasPermission']);
  const memberServiceMock = jasmine.createSpyObj<PublicMemberService>('PublicMemberService', ['getAll', 'getSummary', 'getAllAvailable']);
  const keyServiceMock = jasmine.createSpyObj<MemberKeyService>('MemberKeyService', ['getAll', 'assign', 'reassign']);
  const profileServiceMock = jasmine.createSpyObj<MemberProfileService>('MemberProfileService', ['getOne']);
  const feeTypeServiceMock = jasmine.createSpyObj<FeeTypeService>('FeeTypeService', ['getAllAvailable']);
  const contactMethodServiceMock = jasmine.createSpyObj<ContactMethodService>('ContactMethodService', ['getAllAvailable']);
  const member = Object.assign(new PublicMember(), { number: 12, memberNumber: 37, name: { fullName: 'Ana López' } });
  const other = Object.assign(new PublicMember(), { number: 15, memberNumber: 42, name: { fullName: 'Luis García' } });
  const key: KeyAssignment = { number: 7, available: true, description: 'Principal' };
  const assigned: KeyAssignment = { ...key, profile: { number: 12, name: 'Ana López' } };

  beforeEach(async () => {
    authServiceMock.hasPermission.and.returnValue(true);
    memberServiceMock.getAllAvailable.calls.reset();
    memberServiceMock.getAllAvailable.and.returnValue(of([member]));
    memberServiceMock.getAll.and.returnValue(of(new Page<PublicMember>()));
    memberServiceMock.getSummary.and.returnValue(of(new MemberCount()));
    keyServiceMock.getAll.calls.reset();
    keyServiceMock.getAll.and.returnValue(of([assigned]));
    keyServiceMock.assign.calls.reset();
    keyServiceMock.reassign.calls.reset();
    keyServiceMock.reassign.and.returnValue(of({ ...key, profile: { number: 15, name: 'Luis García' } }));
    keyServiceMock.assign.and.returnValue(of(assigned));
    profileServiceMock.getOne.calls.reset();

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

    expect(button).withContext('the visible drawer must offer assignment for an unassigned key').toBeDefined();
    button?.click();
    fixture.detectChanges();

    expect(component.dialog).toBe(Dialog.KEY_ASSIGN);
    expect(component.assignmentMembers).toEqual([member]);
    expect(memberServiceMock.getAllAvailable).toHaveBeenCalledTimes(1);
    expect(profileServiceMock.getOne).not.toHaveBeenCalled();
  });

  it('saves the assignment through the drawer footer using native form submission', async () => {
    component.onShowKeyAssignment();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const drawer = fixture.debugElement.query(By.directive(Drawer)).componentInstance as Drawer;
    const footer = drawer.container?.querySelector('[data-pc-section="footer"]');
    const submit = footer?.querySelector<HTMLButtonElement>('button[data-action="submit"]');
    const form = component.fieldsKeyAssignmentForm();

    expect(submit).withContext('the assignment drawer must render a submit action in its footer').toBeTruthy();
    expect(submit?.form?.id).toBe('public-member-view-assign-key');
    expect(submit?.disabled).toBeTrue();
    expect(form).toBeDefined();
    if (!form || !submit) {
      return;
    }
    editForm(form.form, { profile: 12 });
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(submit.disabled).toBeFalse();
    submit.click();
    fixture.detectChanges();

    expect(keyServiceMock.assign).toHaveBeenCalledOnceWith(7, 12);
    expect(component.dialog).toBe(Dialog.NONE);
  });

  it('cancels assignment through the drawer footer without saving', async () => {
    component.onShowKeyAssignment();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const drawer = fixture.debugElement.query(By.directive(Drawer)).componentInstance as Drawer;
    const footer = drawer.container?.querySelector('[data-pc-section="footer"]');
    const cancel = footer?.querySelector<HTMLButtonElement>('button[data-action="cancel"]');

    expect(cancel).withContext('the assignment drawer must render a cancel action in its footer').toBeTruthy();
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
    expect(submit?.disabled).toBeTrue();
    expect(component.fieldsKeyEditForm()).toBeDefined();
  });

  it('hides and rejects assignment without assignment creation permission', async () => {
    authServiceMock.hasPermission.and.callFake(permission => permission !== UcroniaPermissions.keyAssignment.create);
    const restrictedFixture = TestBed.createComponent(PublicMemberView);
    const restricted = restrictedFixture.componentInstance;
    restricted.onShowKey(key);
    restrictedFixture.detectChanges();
    await restrictedFixture.whenStable();
    restrictedFixture.detectChanges();

    restricted.onShowKeyAssignment();
    restricted.onAssignKey(12);

    expect(assignmentButton(restrictedFixture)).toBeUndefined();
    expect(memberServiceMock.getAllAvailable).not.toHaveBeenCalled();
    expect(keyServiceMock.assign).not.toHaveBeenCalled();
    restrictedFixture.destroy();
  });

  it('does not load member choices without public member read permission', () => {
    authServiceMock.hasPermission.and.callFake(permission => permission !== UcroniaPermissions.directory.member.read);
    const restrictedFixture = TestBed.createComponent(PublicMemberView);
    const restricted = restrictedFixture.componentInstance;
    restricted.onShowKey(key);
    restrictedFixture.detectChanges();

    restricted.onShowKeyAssignment();

    expect(restricted.dialog).toBe(Dialog.KEY_INFO);
    expect(memberServiceMock.getAllAvailable).not.toHaveBeenCalled();
    restrictedFixture.destroy();
  });

  it('reassigns an assigned key through the drawer footer and refreshes the list', async () => {
    memberServiceMock.getAllAvailable.and.returnValue(of([member, other]));
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

    expect(component.assignmentMembers).toEqual([other]);
    expect(submit?.form?.id).toBe('public-member-view-assign-key');
    expect(submit?.textContent).toContain('Reasignar llave');
    expect(form).toBeDefined();
    expect(submit).toBeTruthy();
    if (!form || !submit) {
      return;
    }
    editForm(form.form, { profile: 15 });
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(submit.disabled).toBeFalse();
    submit.click();
    fixture.detectChanges();

    expect(keyServiceMock.reassign).toHaveBeenCalledOnceWith(7, 15);
    expect(keyServiceMock.assign).not.toHaveBeenCalled();
    expect(keyServiceMock.getAll).toHaveBeenCalledTimes(1);
    expect(component.dialog).toBe(Dialog.NONE);
    expect(component.selectedTab).toBe('keys');
  });

  it('allows reassignment with update permission and without creation permission', () => {
    component.permissions.keyAssignmentsCreate = false;
    memberServiceMock.getAllAvailable.and.returnValue(of([member, other]));
    component.onShowKey(assigned);

    component.onShowKeyAssignment();
    component.onAssignKey(15);

    expect(keyServiceMock.reassign).toHaveBeenCalledOnceWith(7, 15);
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
    component.dialog = Dialog.KEY_ASSIGN;
    component.assignmentMembers = [other];
    component.onAssignKey(15);

    expect(memberServiceMock.getAllAvailable).not.toHaveBeenCalled();
    expect(keyServiceMock.reassign).not.toHaveBeenCalled();
    expect(keyServiceMock.assign).not.toHaveBeenCalled();
  });

  it('rejects reassigning the key to its current profile', () => {
    memberServiceMock.getAllAvailable.and.returnValue(of([member, other]));
    component.onShowKey(assigned);
    component.onShowKeyAssignment();

    component.onAssignKey(12);

    expect(keyServiceMock.reassign).not.toHaveBeenCalled();
    expect(keyServiceMock.assign).not.toHaveBeenCalled();
  });

  it('preserves the drawer and choices when reassignment fails', () => {
    memberServiceMock.getAllAvailable.and.returnValue(of([member, other]));
    keyServiceMock.reassign.and.returnValue(throwError(() => new Error('Unavailable')));
    component.onShowKey(assigned);
    component.onShowKeyAssignment();

    component.onAssignKey(15);

    expect(component.dialog).toBe(Dialog.KEY_ASSIGN);
    expect(component.assignmentMembers).toEqual([other]);
    expect(component.selectedKey).toEqual(assigned);
    expect(component.status.saving).toBeFalse();
    expect(component.error).not.toBe('');
    expect(keyServiceMock.getAll).not.toHaveBeenCalled();
  });

  it('assigns by profile number and refreshes the key list on the same tab', () => {
    component.selectedTab = 'keys';
    component.onShowKeyAssignment();

    component.onAssignKey(37);
    expect(keyServiceMock.assign).not.toHaveBeenCalled();
    component.onAssignKey(12);

    expect(keyServiceMock.assign).toHaveBeenCalledOnceWith(7, 12);
    expect(keyServiceMock.getAll).toHaveBeenCalledTimes(1);
    expect(component.keyAssignments).toEqual([assigned]);
    expect(component.dialog).toBe(Dialog.NONE);
    expect(component.selectedTab).toBe('keys');
  });

  it('retains the form and member choices when assignment fails', () => {
    keyServiceMock.assign.and.returnValue(throwError(() => new Error('Conflict')));
    component.onShowKeyAssignment();

    component.onAssignKey(12);

    expect(component.dialog).toBe(Dialog.KEY_ASSIGN);
    expect(component.assignmentMembers).toEqual([member]);
    expect(component.error).not.toBe('');
    expect(component.status.saving).toBeFalse();
    expect(keyServiceMock.getAll).not.toHaveBeenCalled();
  });

  it('cancels member loading and ignores late responses when returning to key details', () => {
    const pending = new Subject<PublicMember[]>();
    memberServiceMock.getAllAvailable.and.returnValue(pending);
    component.onShowKeyAssignment();
    component.onAssignKey(12);

    expect(keyServiceMock.assign).not.toHaveBeenCalled();
    component.onCancelKeyAssignment();
    pending.next([member]);

    expect(component.dialog).toBe(Dialog.KEY_INFO);
    expect(component.assignmentMembers).toEqual([]);
    expect(component.status.loadingAssignmentMembers).toBeFalse();
    expect(pending.observed).toBeFalse();
  });

  it('allows retrying failed member loading before assigning', () => {
    memberServiceMock.getAllAvailable.and.returnValue(throwError(() => new Error('Unavailable')));
    component.onShowKeyAssignment();
    component.onAssignKey(12);

    expect(component.status.assignmentMembersError).toBeTrue();
    expect(keyServiceMock.assign).not.toHaveBeenCalled();

    memberServiceMock.getAllAvailable.and.returnValue(of([member]));
    component.loadAssignmentMembers();

    expect(component.status.assignmentMembersError).toBeFalse();
    expect(component.assignmentMembers).toEqual([member]);
  });

  function assignmentButton(viewFixture: ComponentFixture<PublicMemberView>): HTMLButtonElement | undefined {
    const drawer = viewFixture.debugElement.query(By.directive(Drawer)).componentInstance as Drawer;
    const buttons = drawer.container?.querySelectorAll<HTMLButtonElement>('button') ?? [];

    return Array.from(buttons).find(button => button.textContent?.trim() === 'Asignar socio');
  }

});
