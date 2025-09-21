import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BookLendingService } from './book-lending-service/book-lending-service';

describe('BookLendingService', () => {
  let service: BookLendingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(BookLendingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
