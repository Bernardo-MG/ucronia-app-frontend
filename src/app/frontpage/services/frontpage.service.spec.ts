import { TestBed } from '@angular/core/testing';

import { FrontpageService } from './frontpage.service';

describe('FrontpageService', () => {
  let service: FrontpageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrontpageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
