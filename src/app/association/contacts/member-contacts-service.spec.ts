import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MemberContacsService } from './member-contacts-service';

describe('MembersService', () => {
  let service: MemberContacsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
    });
    service = TestBed.inject(MemberContacsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
