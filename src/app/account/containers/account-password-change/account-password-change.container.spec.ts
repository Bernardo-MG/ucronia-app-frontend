import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountChangePasswordFormComponent } from '@app/account/components/account-change-password-form/account-change-password-form.component';
import { AccountService } from '@app/account/services/account.service';
import { AccountPasswordChangeContainer } from './account-password-change.container';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AccountPasswordChangeContainer', () => {
  let component: AccountPasswordChangeContainer;
  let fixture: ComponentFixture<AccountPasswordChangeContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AccountPasswordChangeContainer,
        AccountChangePasswordFormComponent
      ],
      providers: [
        AccountService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccountPasswordChangeContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
