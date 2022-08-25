import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AdminFeeService } from './admin-fee.service';

describe('AdminFeeService', () => {
  let service: AdminFeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(AdminFeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
