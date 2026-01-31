import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountChangePasswordForm } from '@app/account/account-change-password-form/account-change-password-form';
import { AccountService } from '@app/account/account-service';
import { AccountPasswordChangeView } from './account-password-change-view';

describe('AccountPasswordChangeView', () => {
  let component: AccountPasswordChangeView;
  let fixture: ComponentFixture<AccountPasswordChangeView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AccountPasswordChangeView,
        AccountChangePasswordForm
      ],
      providers: [
        AccountService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccountPasswordChangeView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
