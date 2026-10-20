import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { AuthService } from '@bernardo-mg/authentication';
import { UcroniaPermissions } from '@ucronia/auth';
import { Key, KeyAssignment } from '@ucronia/domain';
import { of, Subject, throwError } from 'rxjs';
import { MemberKeyForm } from '../member-key-form/member-key-form';
import { MemberKeyService } from '../member-key-service';
import { MemberKeyInfo } from './member-key-info';

describe('MemberKeyInfo', () => {
  let component: MemberKeyInfo;
  let fixture: ComponentFixture<MemberKeyInfo>;
  let key: KeyAssignment;

  const authServiceMock = jasmine.createSpyObj<AuthService>('AuthService', ['hasPermission']);
  const memberKeyServiceMock = jasmine.createSpyObj<MemberKeyService>('MemberKeyService', ['update']);

  beforeEach(async () => {
    key = {
      number: 3,
      available: false,
      description: 'Principal',
      member: { number: 10, memberNumber: 37, name: 'Ana García' }
    };
    authServiceMock.hasPermission.and.returnValue(true);
    memberKeyServiceMock.update.calls.reset();
    memberKeyServiceMock.update.and.returnValue(of(key));

    await TestBed.configureTestingModule({
      imports: [MemberKeyInfo],
      providers: [
        provideNoopAnimations(),
        { provide: AuthService, useValue: authServiceMock },
        { provide: MemberKeyService, useValue: memberKeyServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MemberKeyInfo);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('data', key);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the key details and its assigned member', () => {
    const content = fixture.nativeElement.textContent;

    expect(content).toContain('Llave #3');
    expect(content).toContain('Principal');
    expect(content).toContain('Perdida');
    expect(content).toContain('Ana García');
    expect(content).toContain('Socio #37');
  });

  it('should show when a key has no assigned member', () => {
    fixture.componentRef.setInput('data', { ...key, member: undefined });
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Sin socio asignado');
  });

  it('should hide editing and reject updates without key update permission', () => {
    authServiceMock.hasPermission.and.callFake(permission => permission !== UcroniaPermissions.key.update);
    fixture.destroy();
    fixture = TestBed.createComponent(MemberKeyInfo);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('data', key);
    fixture.detectChanges();
    component.onShowEdit();
    component.onUpdate(key);

    expect(fixture.nativeElement.querySelector('[data-action="edit"]')).toBeNull();
    expect(component.editing).toBeFalse();
    expect(memberKeyServiceMock.update).not.toHaveBeenCalled();
  });

  it('should hide details and reject updates without key read permission', () => {
    authServiceMock.hasPermission.and.callFake(permission => permission !== UcroniaPermissions.key.read);
    fixture.destroy();
    fixture = TestBed.createComponent(MemberKeyInfo);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('data', key);
    fixture.detectChanges();
    component.onShowEdit();
    component.onUpdate(key);

    expect(fixture.nativeElement.querySelector('p-drawer')).toBeNull();
    expect(memberKeyServiceMock.update).not.toHaveBeenCalled();
  });

  it('should populate the member key form and save the edited values', () => {
    const updated = spyOn(component.updated, 'emit');
    const close = spyOn(component.close, 'emit');
    component.onShowEdit();
    fixture.detectChanges();
    const form = fixture.debugElement.query(By.directive(MemberKeyForm)).componentInstance as MemberKeyForm;

    expect(form.form.get('description')?.value).toBe('Principal');
    expect(form.form.get('available')?.value).toBeFalse();

    form.form.patchValue({ available: true, description: 'Lateral' });
    form.form.markAsDirty();
    form.onSave();

    expect(memberKeyServiceMock.update).toHaveBeenCalledOnceWith({
      number: 3, available: true, description: 'Lateral'
    });
    expect(updated).toHaveBeenCalledTimes(1);
    expect(close).toHaveBeenCalledTimes(1);
  });

  it('should use the selected key number and allow clearing its description', () => {
    component.onShowEdit();
    component.onUpdate({ number: 99, available: false, description: '' });

    expect(memberKeyServiceMock.update).toHaveBeenCalledOnceWith({
      number: 3, available: false, description: ''
    });
  });

  it('should return to unchanged details when cancelling an edit', () => {
    component.onShowEdit();
    fixture.detectChanges();
    const form = fixture.debugElement.query(By.directive(MemberKeyForm)).componentInstance as MemberKeyForm;
    form.form.patchValue({ description: 'Discarded' });
    component.onCancelEdit();
    fixture.detectChanges();

    expect(component.editing).toBeFalse();
    expect(fixture.nativeElement.textContent).toContain('Principal');
    expect(memberKeyServiceMock.update).not.toHaveBeenCalled();
  });

  it('should keep editing after a failed update without emitting success', () => {
    const updated = spyOn(component.updated, 'emit');
    const close = spyOn(component.close, 'emit');
    memberKeyServiceMock.update.and.returnValue(throwError(() => new Error('Failed')));
    component.onShowEdit();
    component.onUpdate(key);

    expect(component.editing).toBeTrue();
    expect(component.saving).toBeFalse();
    expect(component.error).not.toBe('');
    expect(updated).not.toHaveBeenCalled();
    expect(close).not.toHaveBeenCalled();
  });

  it('should prevent duplicate updates, cancelling and closing while saving', () => {
    const response = new Subject<Key>();
    const close = spyOn(component.close, 'emit');
    memberKeyServiceMock.update.and.returnValue(response);
    component.onShowEdit();
    component.onUpdate(key);
    component.onUpdate(key);
    component.onCancelEdit();
    component.onDrawerVisibleChange(false);

    expect(memberKeyServiceMock.update).toHaveBeenCalledTimes(1);
    expect(component.editing).toBeTrue();
    expect(component.saving).toBeTrue();
    expect(close).not.toHaveBeenCalled();

    response.next(key);
    response.complete();

    expect(component.saving).toBeFalse();
    expect(close).toHaveBeenCalledTimes(1);
  });
});
