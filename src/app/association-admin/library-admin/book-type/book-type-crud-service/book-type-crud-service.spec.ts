import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BookTypeCrudService } from './book-type-crud-service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('BookTypeCrudService', () => {
  let service: BookTypeCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [
        BookTypeCrudService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});

    service = TestBed.inject(BookTypeCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
