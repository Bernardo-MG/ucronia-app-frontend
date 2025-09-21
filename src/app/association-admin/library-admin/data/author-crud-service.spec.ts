import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthorCrudService } from '../author/author-crud-service';

describe('AuthorCrudService', () => {
  let service: AuthorCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [
        AuthorCrudService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    service = TestBed.inject(AuthorCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
