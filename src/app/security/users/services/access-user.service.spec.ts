import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AccessUserService } from './access-user.service';

describe('AccessUserService', () => {
  let service: AccessUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AccessUserService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(AccessUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
