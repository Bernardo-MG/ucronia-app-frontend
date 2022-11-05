import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SecurityUserService } from './security-user.service';

describe('SecurityUserService', () => {
  let service: SecurityUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        SecurityUserService
      ]
    });
    service = TestBed.inject(SecurityUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
