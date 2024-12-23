import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountChangePasswordFormComponent } from '@app/account/components/password-change/account-change-password-form/account-change-password-form.component';
import { AccountService } from '@app/account/services/account.service';
import { AccountPasswordChangeContainer } from './account-password-change.container';

describe('AccountPasswordChangeContainer', () => {
  let component: AccountPasswordChangeContainer;
  let fixture: ComponentFixture<AccountPasswordChangeContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        AccountPasswordChangeContainer,
        AccountChangePasswordFormComponent
      ],
      providers: [
        AccountService
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
