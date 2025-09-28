import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { GameSystemCrudService } from './game-system-crud-service';

describe('GameSystemCrudService', () => {
  let service: GameSystemCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [
        GameSystemCrudService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});

    service = TestBed.inject(GameSystemCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
