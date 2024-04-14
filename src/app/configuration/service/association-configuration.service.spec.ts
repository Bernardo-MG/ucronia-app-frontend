import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AssociationConfigurationService } from './association-configuration.service';

describe('AssociationConfigurationService', () => {
  let service: AssociationConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AssociationConfigurationService
      ]
    });
    service = TestBed.inject(AssociationConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
