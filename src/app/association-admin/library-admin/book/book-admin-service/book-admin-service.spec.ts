import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BookAdminService } from './book-admin-service';

describe('GameAdminService', () => {
  let service: BookAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        BookAdminService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(BookAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
