import { TestBed } from '@angular/core/testing';

import { AssociationLayoutService } from './association-layout.service';

describe('AssociationLayoutService', () => {
  let service: AssociationLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssociationLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
