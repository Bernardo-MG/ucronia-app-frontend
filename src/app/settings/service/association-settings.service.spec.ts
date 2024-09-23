import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AssociationSettingService } from './association-settings.service';

describe('AssociationSettingService', () => {
  let service: AssociationSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AssociationSettingService
      ]
    });
    service = TestBed.inject(AssociationSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
