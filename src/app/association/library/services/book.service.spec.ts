import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BookService } from './book.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('BookService', () => {
  let service: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [
        BookService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});

    service = TestBed.inject(BookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
