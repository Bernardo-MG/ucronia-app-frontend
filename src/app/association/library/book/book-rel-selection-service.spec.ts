import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BookRelationshipSelectionService } from './book-rel-selection-service';

describe('BookRelationshipSelectionService', () => {
  let service: BookRelationshipSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        BookRelationshipSelectionService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(BookRelationshipSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
