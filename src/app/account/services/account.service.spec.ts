import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { EMPTY } from 'rxjs';
import { AccountService } from './account.service';

describe('AccountService', () => {
  let service: AccountService;
  let authContainer: AuthContainer;

  beforeEach(() => {
    authContainer = jasmine.createSpyObj('authContainer', ['getStatus']);
    (authContainer as any).getStatus.and.returnValue(EMPTY);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        AccountService,
        { provide: AuthContainer, useValue: authContainer }
      ]
    });
    service = TestBed.inject(AccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
