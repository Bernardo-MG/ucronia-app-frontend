import { TestBed } from '@angular/core/testing';
import { UcroniaClient } from '@ucronia/api';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { ScheduledGameService } from './scheduled-game-service';

describe('ScheduledGameService', () => {
  let service: ScheduledGameService;

  const mockUcroniaClient = {
    scheduledGame: {
      create: jasmine.createSpy().and.returnValue(of({})),
      update: jasmine.createSpy().and.returnValue(of({})),
      get: jasmine.createSpy().and.returnValue(of({})),
      delete: jasmine.createSpy().and.returnValue(of({})),
      page: jasmine.createSpy().and.returnValue(of({
        content: [],
        page: 0,
        size: 10,
        totalElements: 0,
        totalPages: 0
      }))
    },
    profile: {
      get: jasmine.createSpy().and.returnValue(of({}))
    },
    gameTable: {
      get: jasmine.createSpy().and.returnValue(of({})),
      page: jasmine.createSpy().and.returnValue(of({
        content: [],
        page: 1,
        size: 100,
        totalElements: 0,
        totalPages: 0,
        last: true
      }))
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MessageService,
        { provide: UcroniaClient, useValue: mockUcroniaClient }
      ]
    });
    service = TestBed.inject(ScheduledGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a game table', () => {
    service.getTable(10).subscribe();

    expect(mockUcroniaClient.gameTable.get).toHaveBeenCalledWith(10);
  });

  it('should get all game tables', () => {
    service.getTables().subscribe();

    expect(mockUcroniaClient.gameTable.page).toHaveBeenCalled();
  });
});
