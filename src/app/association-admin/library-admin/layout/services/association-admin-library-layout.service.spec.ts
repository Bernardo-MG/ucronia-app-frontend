import { TestBed } from '@angular/core/testing';

import { AssociationAdminLibraryLayoutService } from './association-admin-library-layout.service';

describe('AssociationAdminLibraryLayoutService', () => {
  let service: AssociationAdminLibraryLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssociationAdminLibraryLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
