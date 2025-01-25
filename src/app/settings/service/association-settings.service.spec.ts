import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AssociationSettingsService } from './association-settings.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AssociationSettingsService', () => {
  let service: AssociationSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [
        AssociationSettingsService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    service = TestBed.inject(AssociationSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
