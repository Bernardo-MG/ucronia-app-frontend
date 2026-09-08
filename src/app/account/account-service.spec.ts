import { TestBed } from '@angular/core/testing';
import { SecurityClient } from '@bernardo-mg/security';
import { UcroniaClient } from '@ucronia/api';
import { of } from 'rxjs';
import { AccountService } from './account-service';

describe('AccountService', () => {
  let service: AccountService;

  const securityClientMock = {
    account: {
      get: jasmine.createSpy().and.returnValue(of({}))
    },
    password: {
      change: jasmine.createSpy().and.returnValue(of({}))
    }
  };

  const ucroniaClientMock = {
    account: {
      profile: {
        get: jasmine.createSpy().and.returnValue(of({}))
      },
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: SecurityClient, useValue: securityClientMock },
        { provide: UcroniaClient, useValue: ucroniaClientMock }
      ]
    })
      .compileComponents();
    service = TestBed.inject(AccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
