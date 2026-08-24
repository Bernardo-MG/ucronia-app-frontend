import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SecurityClient } from '@bernardo-mg/security';
import { of } from 'rxjs';

import { AccountView } from './account-view';

describe('AccountView', () => {
  let component: AccountView;
  let fixture: ComponentFixture<AccountView>;

  const securityClientMock = {
    account: {
      get: jasmine.createSpy('getAccount').and.returnValue(of({
        username: 'bernardo',
        name: 'Bernardo',
        email: 'bernardo@example.com',
        profile: undefined
      }))
    },
    password: {
      change: {
        change: jasmine.createSpy('changePassword').and.returnValue(
          of(undefined)
        )
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountView],
      providers: [
        {
          provide: SecurityClient,
          useValue: securityClientMock
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccountView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the empty member state when no profile is assigned', () => {
    expect(fixture.nativeElement.textContent)
      .toContain('Sin miembro asignado');
  });

});