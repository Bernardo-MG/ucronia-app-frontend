import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BookTypeAdminService } from './book-type-admin.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('BookTypeAdminService', () => {
  let service: BookTypeAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [
        BookTypeAdminService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});

    service = TestBed.inject(BookTypeAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
