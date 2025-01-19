import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AccessUserActivateService } from './user-activate.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AccessUserActivateService', () => {
  let service: AccessUserActivateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [
        AccessUserActivateService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    service = TestBed.inject(AccessUserActivateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
