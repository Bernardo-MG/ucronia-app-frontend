import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MemberContactMethodService } from './member-profile-method-service';

describe('MemberContactMethodService', () => {
  let service: MemberContactMethodService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
    });
    service = TestBed.inject(MemberContactMethodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
