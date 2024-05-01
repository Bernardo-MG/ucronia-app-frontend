import { TestBed } from '@angular/core/testing';

import { DonorAdminService } from './donor-admin.service';

describe('DonorAdminService', () => {
  let service: DonorAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonorAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
