import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MembershipEvolutionService } from './membership-evolution-service';

describe('MembershipEvolutionService', () => {
  let service: MembershipEvolutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        MembershipEvolutionService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(MembershipEvolutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
