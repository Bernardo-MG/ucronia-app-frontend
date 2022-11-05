import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SecurityChangePasswordService } from './security-change-password.service';

describe('SecurityChangePasswordService', () => {
  let service: SecurityChangePasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        SecurityChangePasswordService
      ]
    });
    service = TestBed.inject(SecurityChangePasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
