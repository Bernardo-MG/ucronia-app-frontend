import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { GameAdminService } from './book-admin.service';

describe('GameAdminService', () => {
  let service: GameAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        GameAdminService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(GameAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
