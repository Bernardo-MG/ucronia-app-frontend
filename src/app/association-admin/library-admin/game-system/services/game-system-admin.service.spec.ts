import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { GameSystemAdminService } from './game-system-admin.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('GameSystemAdminService', () => {
  let service: GameSystemAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [
        GameSystemAdminService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});

    service = TestBed.inject(GameSystemAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
