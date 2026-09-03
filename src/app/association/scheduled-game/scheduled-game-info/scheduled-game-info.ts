import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { GameTable, Profile, RecurrenceUnit, ScheduledGame } from '@ucronia/domain';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { CalendarStatus } from 'projects/ucronia/domain/src/lib/calendar/calendar-status';

@Component({
  selector: 'assoc-scheduled-game-info',
  imports: [DatePipe, SkeletonModule, TagModule],
  templateUrl: './scheduled-game-info.html'
})
export class ScheduledGameInfo {
  public readonly data = input(new ScheduledGame());
  public readonly master = input(new Profile());
  public readonly table = input<GameTable | undefined>(undefined);
  public readonly loading = input(false);

  public getStatusName(status: CalendarStatus): string {
    switch (status) {
      case CalendarStatus.DRAFT: return 'Borrador';
      case CalendarStatus.PUBLISHED: return 'Publicada';
      case CalendarStatus.PENDING_REVIEW: return 'Pendiente de revisión';
      case CalendarStatus.CANCELLED: return 'Cancelada';
      case CalendarStatus.REJECTED: return 'Rechazada';
      default: return status;
    }
  }

  public getStatusSeverity(status: CalendarStatus): 'success' | 'warn' | 'info' | 'danger' | 'secondary' {
    switch (status) {
      case CalendarStatus.PUBLISHED: return 'success';
      case CalendarStatus.DRAFT: return 'warn';
      case CalendarStatus.PENDING_REVIEW: return 'info';
      case CalendarStatus.CANCELLED:
      case CalendarStatus.REJECTED: return 'danger';
      default: return 'secondary';
    }
  }

  public getRecurrenceName(): string {
    const recurrence = this.data().recurrence;
    if (!recurrence?.interval) return 'Sin recurrencia';

    let unit = recurrence.unit;
    switch (recurrence.unit) {
      case RecurrenceUnit.DAILY: unit = recurrence.interval === 1 ? 'día' : 'días'; break;
      case RecurrenceUnit.WEEKLY: unit = recurrence.interval === 1 ? 'semana' : 'semanas'; break;
      case RecurrenceUnit.MONTHLY: unit = recurrence.interval === 1 ? 'mes' : 'meses'; break;
    }
    return `Cada ${recurrence.interval} ${unit}`;
  }
}
