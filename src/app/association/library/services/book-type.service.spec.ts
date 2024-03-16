import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BookTypeService } from './book-type.service';

describe('BookTypeService', () => {
  let service: BookTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });

    service = TestBed.inject(BookTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
