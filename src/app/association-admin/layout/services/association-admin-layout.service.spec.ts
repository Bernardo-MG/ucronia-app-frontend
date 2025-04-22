import { TestBed } from '@angular/core/testing';

import { AssociationAdminLayoutService } from './association-admin-layout.service';

describe('AssociationAdminLayoutService', () => {
  let service: AssociationAdminLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssociationAdminLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
