import { TestBed } from '@angular/core/testing';
import { AssociationAdminFeesLayoutService } from './association-admin-fees-layout.service';

describe('AssociationAdminFeesLayoutService', () => {
  let service: AssociationAdminFeesLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssociationAdminFeesLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
