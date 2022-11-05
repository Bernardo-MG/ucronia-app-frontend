import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SecurityRegisterService } from './security-register.service';

describe('SecurityRegisterService', () => {
  let service: SecurityRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        SecurityRegisterService
      ]
    });
    service = TestBed.inject(SecurityRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
