import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { GameSystemAdminService } from './game-system-admin.service';

describe('GameSystemAdminService', () => {
  let service: GameSystemAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        GameSystemAdminService
      ]
    });

    service = TestBed.inject(GameSystemAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
