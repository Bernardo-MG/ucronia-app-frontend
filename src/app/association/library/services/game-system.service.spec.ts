import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { GameSystemService } from './game-system.service';

describe('GameSystemService', () => {
  let service: GameSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        GameSystemService
      ]
    });

    service = TestBed.inject(GameSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
