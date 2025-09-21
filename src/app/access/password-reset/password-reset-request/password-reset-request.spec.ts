import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Email } from '../models/email';
import { PasswordResetService } from '../password-reset-service';
import { PasswordResetRequest } from './password-reset-request';

describe('PasswordResetRequest', () => {
  let component: PasswordResetRequest;
  let fixture: ComponentFixture<PasswordResetRequest>;
  let service: PasswordResetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordResetRequest],
      providers: [
        PasswordResetService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PasswordResetRequest);
    component = fixture.componentInstance;
    service = TestBed.inject(PasswordResetService);
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
      const spy = spyOn(service, 'requestResetPassword').and.returnValue(of({ content: undefined }));

      const data = new Email('test@example.com');
      component.onPasswordResetRequest(data);

      expect(spy).toHaveBeenCalledWith(data);
    });

    it('should call set as finished', () => {
      const spy = spyOn(service, 'requestResetPassword').and.returnValue(of({ content: undefined }));

      const data = new Email('test@example.com');
      component.onPasswordResetRequest(data);

      expect(component.finished).toBeTrue();
    });

  });

});
