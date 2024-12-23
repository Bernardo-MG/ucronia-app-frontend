import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PublisherAdminService } from './publisher-admin.service';

describe('PublisherAdminService', () => {
  let service: PublisherAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        PublisherAdminService
      ]
    });
    service = TestBed.inject(PublisherAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
