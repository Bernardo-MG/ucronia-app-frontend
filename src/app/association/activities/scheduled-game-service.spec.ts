import { TestBed } from '@angular/core/testing';

import { ScheduledGameService } from './scheduled-game-service';

describe('ScheduledGameService', () => {
  let service: ScheduledGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduledGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
