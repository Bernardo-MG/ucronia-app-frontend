import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountService } from '@app/account/account-service';
import { SecurityClient } from '@bernardo-mg/security';
import { of } from 'rxjs';
import { AccountLayout } from './account-layout';

describe('AccountLayout', () => {
  let component: AccountLayout;
  let fixture: ComponentFixture<AccountLayout>;

  const securityClientMock = {
    account: {
      get: jasmine.createSpy().and.returnValue(of({
        username: 'bernardo',
        name: 'Bernardo',
        email: 'bernardo@example.com'
      }))
    },
    password: {
      change: {
        change: jasmine.createSpy().and.returnValue(of(undefined))
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AccountLayout
      ],
      providers: [
        AccountService,
        { provide: SecurityClient, useValue: securityClientMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccountLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the empty member state when no profile is assigned', () => {
    expect(fixture.nativeElement.textContent).toContain('Sin miembro asignado');
  });
});
