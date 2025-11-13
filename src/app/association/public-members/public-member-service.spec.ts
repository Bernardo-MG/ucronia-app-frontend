import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PublicMemberService } from './public-member-service';

describe('PublicMemberService', () => {
  let service: PublicMemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
    });
    service = TestBed.inject(PublicMemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
