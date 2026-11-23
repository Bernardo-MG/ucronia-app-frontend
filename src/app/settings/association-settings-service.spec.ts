import { TestBed } from '@angular/core/testing';
import { UcroniaClient } from '@ucronia/api';
import { MessageService } from '@openng/optimus-ui/api';
import { of } from 'rxjs';
import { AssociationSettingsService } from './association-settings-service';

describe('AssociationSettingsService', () => {
  let service: AssociationSettingsService;

  const ucroniaClientMock = {
    setting: {
      get: vi.fn().mockReturnValue(of({})),
      update: vi.fn().mockReturnValue(of({}))
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
