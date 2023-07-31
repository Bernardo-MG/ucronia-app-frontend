import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PasswordRestService } from './password-reset.service';

describe('PasswordRestService', () => {
  let service: PasswordRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        PasswordRestService
      ]
    });
    service = TestBed.inject(PasswordRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
