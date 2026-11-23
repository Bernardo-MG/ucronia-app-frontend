import { TestBed } from '@angular/core/testing';
import { UcroniaClient } from '@ucronia/api';
import { MessageService } from '@openng/optimus-ui/api';
import { of } from 'rxjs';
import { ScheduledGameService } from './scheduled-game-service';
import { Page, Sorting } from '@bernardo-mg/request';
import { ScheduledGame } from '@ucronia/domain';

describe('ScheduledGameService', () => {
  let service: ScheduledGameService;

  const mockUcroniaClient = {
    scheduledGame: {
      create: vi.fn().mockReturnValue(of({})),
      update: vi.fn().mockReturnValue(of({})),
      get: vi.fn().mockReturnValue(of({})),
      delete: vi.fn().mockReturnValue(of({})),
      page: vi.fn().mockReturnValue(of({
        content: [],
        page: 0,
        size: 10,
        totalElements: 0,
        totalPages: 0
      }))
    },
    profile: {
      get: vi.fn().mockReturnValue(of({}))
    },
    gameTable: {
      get: vi.fn().mockReturnValue(of({})),
      page: vi.fn().mockReturnValue(of({
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

describe('ScheduledGame server pagination', () => {
  it('preserves the server page and totals', () => {
    const result = Object.assign(new Page<ScheduledGame>(), { content: [new ScheduledGame()], totalElements: 35 });
    const page = vi.fn().mockReturnValue(of(result));
    TestBed.configureTestingModule({ providers: [
      MessageService,
      { provide: UcroniaClient, useValue: { scheduledGame: { page } } }
    ] });
    const sort = new Sorting();
    TestBed.inject(ScheduledGameService).getAll(2, sort).subscribe(response => expect(response).toBe(result));
    expect(page).toHaveBeenCalledTimes(1);
    expect(page).toHaveBeenCalledWith(2, undefined, expect.any(Sorting));
  });
});
