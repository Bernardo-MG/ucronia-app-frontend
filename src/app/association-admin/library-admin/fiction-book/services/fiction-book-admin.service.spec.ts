import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FictionBookAdminService } from './fiction-book-admin.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('GameBookAdminService', () => {
  let service: FictionBookAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        FictionBookAdminService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(FictionBookAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
