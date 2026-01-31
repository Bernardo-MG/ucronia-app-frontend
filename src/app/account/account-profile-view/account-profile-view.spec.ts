import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountService } from '@app/account/account-service';
import { SecurityClient } from '@bernardo-mg/security';
import { of } from 'rxjs';
import { AccountProfileView } from './account-profile-view';

describe('AccountProfileView', () => {
  let component: AccountProfileView;
  let fixture: ComponentFixture<AccountProfileView>;

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
      imports: [AccountProfileView],
      providers: [
        AccountService,
        { provide: SecurityClient, useValue: securityClientMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccountProfileView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
