import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PublisherCrudService } from './publisher-crud-service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('PublisherCrudService', () => {
  let service: PublisherCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [
        PublisherCrudService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    service = TestBed.inject(PublisherCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
