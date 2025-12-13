import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ContactMethodService } from './contact-method-service';

describe('ContactMethodService', () => {
  let service: ContactMethodService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ContactMethodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
