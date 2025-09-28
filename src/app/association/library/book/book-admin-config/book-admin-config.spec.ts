import { TestBed } from '@angular/core/testing';
import { BookAdminConfig } from './book-admin-config';

describe('BookAdminConfig', () => {
  let service: BookAdminConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        BookAdminConfig
      ]
    });

    service = TestBed.inject(BookAdminConfig);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
