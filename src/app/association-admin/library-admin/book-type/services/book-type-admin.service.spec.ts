import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BookTypeAdminService } from './book-type-admin.service';

describe('BookTypeAdminService', () => {
  let service: BookTypeAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        BookTypeAdminService
      ]
    });

    service = TestBed.inject(BookTypeAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
