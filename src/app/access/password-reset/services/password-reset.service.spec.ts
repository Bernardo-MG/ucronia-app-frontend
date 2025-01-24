import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PasswordResetService } from './password-reset.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('PasswordResetService', () => {
  let service: PasswordResetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [
        PasswordResetService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    service = TestBed.inject(PasswordResetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
