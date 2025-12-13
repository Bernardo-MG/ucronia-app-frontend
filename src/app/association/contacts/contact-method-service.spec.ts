import { TestBed } from '@angular/core/testing';

import { ContactMethodService } from './contact-method-service';

describe('ContactMethodService', () => {
  let service: ContactMethodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactMethodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
