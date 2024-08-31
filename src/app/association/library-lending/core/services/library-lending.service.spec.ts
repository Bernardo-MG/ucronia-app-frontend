import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LibraryLendingService } from './library-lending.service';

describe('LibraryLendingService', () => {
  let service: LibraryLendingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(LibraryLendingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
