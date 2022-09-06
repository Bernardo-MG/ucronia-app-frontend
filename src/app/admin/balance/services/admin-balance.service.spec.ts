import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AdminBalanceService } from './admin-balance.service';

describe('AdminBalanceService', () => {
  let service: AdminBalanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(AdminBalanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
