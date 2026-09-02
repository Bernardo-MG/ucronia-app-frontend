import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Page } from '@bernardo-mg/request';
import { GameTable, Profile, ScheduledGame } from '@ucronia/domain';
import { ConfirmationService } from 'primeng/api';
import { of } from 'rxjs';
import { ScheduledGameService } from '../scheduled-game-service';
import { ScheduledGameView } from './scheduled-game-view';

describe('ScheduledGameView', () => {
  let component: ScheduledGameView;
  let fixture: ComponentFixture<ScheduledGameView>;

  const scheduledGameServiceMock = jasmine.createSpyObj<ScheduledGameService>(
    'ScheduledGameService',
    ['create', 'update', 'delete', 'getAll', 'getOne', 'getMaster', 'getTable']
  );

  beforeEach(async () => {

    scheduledGameServiceMock.getAll.and.returnValue(
      of(new Page<ScheduledGame>())
    );

    await TestBed.configureTestingModule({
      imports: [ScheduledGameView],
      providers: [
        provideAnimationsAsync(),
        ConfirmationService,
        { provide: ScheduledGameService, useValue: scheduledGameServiceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ScheduledGameView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the game, master and table when showing its details', () => {
    const game = new ScheduledGame();
    const master = new Profile();
    const table = new GameTable();

    game.number = 1;
    game.master = 2;
    game.table = 3;
    master.number = 2;
    table.number = 3;

    scheduledGameServiceMock.getOne.and.returnValue(of(game));
    scheduledGameServiceMock.getMaster.and.returnValue(of(master));
    scheduledGameServiceMock.getTable.and.returnValue(of(table));

    component.onShowInfo(game);

    expect(scheduledGameServiceMock.getOne).toHaveBeenCalledWith(1);
    expect(scheduledGameServiceMock.getMaster).toHaveBeenCalledWith(2);
    expect(scheduledGameServiceMock.getTable).toHaveBeenCalledWith(3);
    expect(component.selectedData).toBe(game);
    expect(component.selectedMaster).toBe(master);
    expect(component.selectedTable).toBe(table);
  });

  it('should not load a table when the game has none', () => {
    const game = new ScheduledGame();
    const master = new Profile();

    game.number = 1;
    game.master = 2;
    game.table = undefined;

    scheduledGameServiceMock.getOne.and.returnValue(of(game));
    scheduledGameServiceMock.getMaster.and.returnValue(of(master));
    scheduledGameServiceMock.getTable.calls.reset();

    component.onShowInfo(game);

    expect(scheduledGameServiceMock.getTable).not.toHaveBeenCalled();
    expect(component.selectedTable).toBeUndefined();
  });
});
