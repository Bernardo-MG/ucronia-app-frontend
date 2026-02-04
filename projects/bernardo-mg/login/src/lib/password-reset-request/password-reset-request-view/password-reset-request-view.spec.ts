import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { SecurityClient } from '@bernardo-mg/security';
import { of } from 'rxjs';
import { PasswordResetRequestService } from '../password-reset-request-service';
import { PasswordResetRequestView } from './password-reset-request-view';

describe('PasswordResetRequest', () => {
  let component: PasswordResetRequestView;
  let fixture: ComponentFixture<PasswordResetRequestView>;
  let service: PasswordResetRequestService;

  const mockSecurityClient = {
    password: {
      reset: {
        requestReset: jasmine.createSpy().and.returnValue(of({}))
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordResetRequestView],
      providers: [
        PasswordResetRequestService,
        { provide: SecurityClient, useValue: mockSecurityClient },
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PasswordResetRequestView);
    component = fixture.componentInstance;
    service = TestBed.inject(PasswordResetRequestService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('template rendering', () => {

    it('should render the form when not finished', () => {
      component.finished = false;
      fixture.detectChanges();

      const form = fixture.debugElement.query(By.css('login-password-reset-request-form'));

      expect(form).toBeTruthy();
    });

    it('should not render the email sent message when not finished', () => {
      component.finished = false;
      fixture.detectChanges();

      const message = fixture.nativeElement.textContent;

      expect(message).not.toContain('Se ha enviado un correo');
    });

    it('should not render the form when finished', () => {
      component.finished = true;
      fixture.detectChanges();

      const message = fixture.nativeElement.textContent;

      expect(message).toContain('Se ha enviado un correo');
    });

    it('should render the email sent message when finished', () => {
      component.finished = true;
      fixture.detectChanges();

      const form = fixture.debugElement.query(By.css('login-password-reset-request-form'));

      expect(form).toBeNull();
    });

  });

  describe('password reset', () => {

    it('should call service', () => {
      const spy = spyOn(service, 'requestPasswordReset').and.returnValue(of({ content: undefined }));
      const email = 'test@example.com';

      component.onPasswordResetRequest(email);

      expect(spy).toHaveBeenCalledWith(email);
    });

    it('should set as finished', () => {
      component.onPasswordResetRequest('test@example.com');

      expect(component.finished).toBeTrue();
    });

  });

});
