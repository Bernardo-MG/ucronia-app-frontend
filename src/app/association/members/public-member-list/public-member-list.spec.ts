import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PublicMember } from '@ucronia/domain';
import { AuthService } from '@bernardo-mg/authentication';
import { UcroniaPermissions } from '@ucronia/auth';
import { UcroniaClient } from '@ucronia/api';
import { Member } from '@ucronia/domain';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { of } from 'rxjs';
import { PublicMemberList } from './public-member-list';

describe('PublicMemberList', () => {
  let component: PublicMemberList;
  let fixture: ComponentFixture<PublicMemberList>;

  const auth = { hasPermission: jasmine.createSpy().and.returnValue(true) };
  const get = jasmine.createSpy().and.returnValue(of(new Member()));

  beforeEach(async () => {
    auth.hasPermission.and.returnValue(true);
    get.calls.reset();
    await TestBed.configureTestingModule({
      imports: [PublicMemberList],
      providers: [
        MessageService,
        provideAnimationsAsync(),
        { provide: AuthService, useValue: auth },
        { provide: UcroniaClient, useValue: { memberProfile: { get } } },
        ConfirmationService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicMemberList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('shows the member number from the public API response', () => {
    const member = Object.assign(new PublicMember(), { memberNumber: 37 });
    fixture.componentRef.setInput('members', [member]);
    fixture.componentRef.setInput('rows', 10);
    fixture.componentRef.setInput('page', 1);
    fixture.componentRef.setInput('totalRecords', 1);
    fixture.detectChanges();

    const cells = fixture.nativeElement.querySelectorAll('tbody td');
    expect(cells[1].textContent.trim()).toBe('#37');
  });

  it('loads information using the profile number when the eye button is clicked', () => {
    fixture.componentRef.setInput('members', [Object.assign(new PublicMember(), { number: 12, memberNumber: 37 })]);
    fixture.componentRef.setInput('rows', 10);
    fixture.componentRef.setInput('page', 1);
    fixture.componentRef.setInput('totalRecords', 1);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button[aria-label="Ver información del socio"]');
    expect(button).not.toBeNull();
    button.click();
    expect(get).toHaveBeenCalledWith(12);
  });

  it('hides the eye button without member read permission', () => {
    auth.hasPermission.and.returnValue(false);
    const restricted = TestBed.createComponent(PublicMemberList);
    restricted.componentRef.setInput('members', [new PublicMember()]);
    restricted.componentRef.setInput('rows', 10);
    restricted.componentRef.setInput('page', 1);
    restricted.componentRef.setInput('totalRecords', 1);
    restricted.detectChanges();
    expect(restricted.nativeElement.querySelector('button[aria-label="Ver información del socio"]')).toBeNull();
    expect(get).not.toHaveBeenCalled();
    restricted.destroy();
  });

  it('shows the eye button with member read access and does not request private information', () => {
    auth.hasPermission.and.callFake(permission => permission === UcroniaPermissions.directory.member.read);
    const publicFixture = TestBed.createComponent(PublicMemberList);
    publicFixture.componentRef.setInput('members', [Object.assign(new PublicMember(), { number: 12, memberNumber: 37 })]);
    publicFixture.componentRef.setInput('rows', 10);
    publicFixture.componentRef.setInput('page', 1);
    publicFixture.componentRef.setInput('totalRecords', 1);
    publicFixture.detectChanges();
    const button = publicFixture.nativeElement.querySelector('button[aria-label="Ver información del socio"]');
    expect(button).not.toBeNull();
    button.click();
    publicFixture.detectChanges();
    expect(get).not.toHaveBeenCalled();
    expect(publicFixture.nativeElement.textContent).not.toContain('La siguiente información es privada');
    publicFixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
