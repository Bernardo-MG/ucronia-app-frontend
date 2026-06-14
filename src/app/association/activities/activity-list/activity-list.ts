import { DatePipe } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { Activity } from '@ucronia/domain';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule, TablePageEvent } from 'primeng/table';

@Component({
  selector: 'app-activity-list',
  imports: [ButtonModule, TableModule, DatePipe],
  templateUrl: './activity-list.html'
})
export class ActivityList {

  public readonly loading = input(false);
  public readonly data = input<Activity[]>([]);
  public readonly rows = input(0);
  public readonly page = input(0);
  public readonly totalRecords = input(0);

  public readonly show = output<Activity>();
  public readonly changeDirection = output<SortingEvent>();
  public readonly changePage = output<number>();

  public get first() {
    return (this.page() - 1) * this.rows();
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / event.rows) + 1;
    this.changePage.emit(page);
  }

}
