import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecurrenceUnit, ScheduledGame } from '@ucronia/domain';
import { CalendarStatus } from 'projects/ucronia/domain/src/lib/calendar/calendar-status';
import { ScheduledGameInfo } from './scheduled-game-info';

describe('ScheduledGameInfo', () => {
  let component: ScheduledGameInfo;
  let fixture: ComponentFixture<ScheduledGameInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduledGameInfo]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ScheduledGameInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should translate the game status', () => {
    expect(component.getStatusName(CalendarStatus.PUBLISHED)).toBe('Publicada');
    expect(component.getStatusSeverity(CalendarStatus.PUBLISHED)).toBe('success');
  });

  it('should describe recurrence in Spanish', () => {
    const game = new ScheduledGame();
    game.recurrence!.interval = 2;
    game.recurrence!.unit = RecurrenceUnit.WEEKLY;
    fixture.componentRef.setInput('data', game);

    expect(component.getRecurrenceName()).toBe('Cada 2 semanas');
  });

  it('should indicate when the game does not recur', () => {
    const game = new ScheduledGame();
    game.recurrence = undefined;
    fixture.componentRef.setInput('data', game);

    expect(component.getRecurrenceName()).toBe('Sin recurrencia');
  });
});
