import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { ScheduledGame } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { TableModule, TablePageEvent } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { CalendarStatus } from 'projects/ucronia/domain/src/lib/calendar/calendar-status';

@Component({
  selector: 'app-scheduled-game-list',
  imports: [ButtonModule, TableModule, TagModule, DatePipe],
  templateUrl: './scheduled-game-list.html'
})
export class ScheduledGameList {

  public readonly loading = input(false);
  public readonly data = input<ScheduledGame[]>([]);
  public readonly rows = input(0);
  public readonly page = input(0);
  public readonly totalRecords = input(0);

  public readonly show = output<ScheduledGame>();
  public readonly changeDirection = output<SortingEvent>();
  public readonly changePage = output<number>();

  public get first() {
    return (this.page() - 1) * this.rows();
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / event.rows) + 1;
    this.changePage.emit(page);
  }

  public getName(status: CalendarStatus): string {
    switch (status) {
      case CalendarStatus.DRAFT:
        return 'Borrador';
      case CalendarStatus.PUBLISHED:
        return 'Publicada';
      case CalendarStatus.PENDING_REVIEW:
        return 'Pendiente de revisión';
      case CalendarStatus.CANCELLED:
        return 'Cancelada';
      case CalendarStatus.REJECTED:
        return 'Rechazada';
      default:
        return status;
    }
  }

  public getSeverity(status: CalendarStatus): 'success' | 'warn' | 'info' | 'danger' | 'secondary' {
    switch (status) {
      case CalendarStatus.PUBLISHED:
        return 'success';
      case CalendarStatus.DRAFT:
        return 'warn';
      case CalendarStatus.PENDING_REVIEW:
        return 'info';
      case CalendarStatus.CANCELLED:
      case CalendarStatus.REJECTED:
        return 'danger';
      default:
        return 'secondary';
    }
  }

}