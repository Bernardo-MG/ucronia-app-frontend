import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccessRegisterService } from './access-register.service';

describe('AccessRegisterService', () => {
  let service: AccessRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        AccessRegisterService
      ]
    });
    service = TestBed.inject(AccessRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
