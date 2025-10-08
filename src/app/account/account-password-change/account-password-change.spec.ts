import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountChangePasswordForm } from '@app/account/account-change-password-form/account-change-password-form';
import { AccountService } from '@app/account/services/account-service';
import { AccountPasswordChange } from './account-password-change';

describe('AccountPasswordChangeContainer', () => {
  let component: AccountPasswordChange;
  let fixture: ComponentFixture<AccountPasswordChange>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AccountPasswordChange,
        AccountChangePasswordForm
      ],
      providers: [
        AccountService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccountPasswordChange);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
