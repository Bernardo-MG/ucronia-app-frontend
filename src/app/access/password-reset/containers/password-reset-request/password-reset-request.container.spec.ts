import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordResetService } from '../../services/password-reset.service';
import { PasswordResetRequestContainer } from './password-reset-request.container';

describe('PasswordResetRequestContainer', () => {
  let component: PasswordResetRequestContainer;
  let fixture: ComponentFixture<PasswordResetRequestContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordResetRequestContainer],
      providers: [
        PasswordResetService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PasswordResetRequestContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
