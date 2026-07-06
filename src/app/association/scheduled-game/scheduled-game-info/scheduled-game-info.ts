import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { DetailField } from '@bernardo-mg/ui';
import { ScheduledGame } from '@ucronia/domain';

@Component({
  selector: 'assoc-scheduled-game-info',
  imports: [DetailField, DatePipe],
  templateUrl: './scheduled-game-info.html'
})
export class ScheduledGameInfo {

  public readonly data = input(new ScheduledGame());
  public readonly loading = input(false);

}
