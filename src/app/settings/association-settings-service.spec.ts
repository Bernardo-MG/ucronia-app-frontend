import { TestBed } from '@angular/core/testing';
import { UcroniaClient } from '@ucronia/api';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { AssociationSettingsService } from './association-settings-service';

describe('AssociationSettingsService', () => {
  let service: AssociationSettingsService;

  const ucroniaClientMock = {
    setting: {
      get: jasmine.createSpy().and.returnValue(of({})),
      update: jasmine.createSpy().and.returnValue(of({}))
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        MessageService,
        { provide: UcroniaClient, useValue: ucroniaClientMock }
      ]
    });
    service = TestBed.inject(AssociationSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
