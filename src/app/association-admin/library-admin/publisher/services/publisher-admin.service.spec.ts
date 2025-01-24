import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PublisherAdminService } from './publisher-admin.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('PublisherAdminService', () => {
  let service: PublisherAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [
        PublisherAdminService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    service = TestBed.inject(PublisherAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
