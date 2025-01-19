import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthorAdminService } from './author-admin.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AuthorAdminService', () => {
  let service: AuthorAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [
        AuthorAdminService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    service = TestBed.inject(AuthorAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
