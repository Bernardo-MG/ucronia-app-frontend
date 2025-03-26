import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { GameBookAdminService } from './game-book-admin.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('GameBookAdminService', () => {
  let service: GameBookAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        GameBookAdminService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(GameBookAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
