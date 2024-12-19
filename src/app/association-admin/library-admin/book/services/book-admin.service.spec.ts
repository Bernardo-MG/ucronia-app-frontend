import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BookAdminService } from './book-admin.service';

describe('BookAdminService', () => {
  let service: BookAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        BookAdminService
      ]
    });

    service = TestBed.inject(BookAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
