import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MemberBalanceService } from './member-balance.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('MemberBalanceService', () => {
  let service: MemberBalanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [
        MemberBalanceService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    service = TestBed.inject(MemberBalanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
