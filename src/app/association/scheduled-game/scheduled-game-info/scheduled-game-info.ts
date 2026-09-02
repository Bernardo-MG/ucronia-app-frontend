import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { DetailField } from '@bernardo-mg/ui';
import { GameTable, Profile, ScheduledGame } from '@ucronia/domain';
import { CalendarStatus } from 'projects/ucronia/domain/src/lib/calendar/calendar-status';

@Component({
  selector: 'assoc-scheduled-game-info',
  imports: [DetailField, DatePipe],
  templateUrl: './scheduled-game-info.html'
})
export class ScheduledGameInfo {

  public readonly data = input(new ScheduledGame());
  public readonly master = input(new Profile());
  public readonly table = input<GameTable | undefined>(undefined);
  public readonly loading = input(false);

  public getName(status: CalendarStatus): string {
    switch (status) {
      case CalendarStatus.DRAFT:
        return 'Borrador';
      case CalendarStatus.PUBLISHED:
        return 'Publicado';
      default:
        return status;
    }
  }

}
