import { TestBed } from '@angular/core/testing';
import { LibraryConfig } from './library-config';

describe('LibraryConfig', () => {
  let service: LibraryConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        LibraryConfig
      ]
    });

    service = TestBed.inject(LibraryConfig);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
