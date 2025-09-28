import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BookRelationshipSelection } from './book-rel-selection';

describe('BookRelationshipSelection', () => {
  let service: BookRelationshipSelection;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        BookRelationshipSelection,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(BookRelationshipSelection);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
