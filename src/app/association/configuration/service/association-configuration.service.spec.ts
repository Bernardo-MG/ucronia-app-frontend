import { TestBed } from '@angular/core/testing';

import { AssociationConfigurationService } from './association-configuration.service';

describe('AssociationConfigurationService', () => {
  let service: AssociationConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssociationConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
