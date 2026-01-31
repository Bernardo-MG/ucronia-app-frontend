import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountChangePasswordForm } from '@app/account/account-change-password-form/account-change-password-form';
import { AccountService } from '@app/account/account-service';
import { SecurityClient } from '@bernardo-mg/security';
import { of } from 'rxjs';
import { AccountPasswordChangeView } from './account-password-change-view';

describe('AccountPasswordChangeView', () => {
  let component: AccountPasswordChangeView;
  let fixture: ComponentFixture<AccountPasswordChangeView>;

  const securityClientMock = {
    account: {
      get: jasmine.createSpy().and.returnValue(of({}))
    },
    password: {
      change: jasmine.createSpy().and.returnValue(of({}))
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AccountPasswordChangeView,
        AccountChangePasswordForm
      ],
      providers: [
        AccountService,
        { provide: SecurityClient, useValue: securityClientMock }
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
