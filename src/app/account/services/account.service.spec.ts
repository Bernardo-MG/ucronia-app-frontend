import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@app/core/authentication/services/auth.service';
import { EMPTY } from 'rxjs';
import { AccountService } from './account.service';

describe('AccountService', () => {
  let service: AccountService;
  let authService: AuthService;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['getStatus']);
    (authService as any).getStatus.and.returnValue(EMPTY);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        AccountService,
        { provide: AuthService, useValue: authService }
      ]
    });
    service = TestBed.inject(AccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
