import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { Activity, ActivityDate } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { TableModule, TablePageEvent } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-activity-list',
  imports: [ButtonModule, TableModule, TagModule, DatePipe],
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

  public getNextDate(activity: Activity): ActivityDate | undefined {
    const now = new Date();
    return [...activity.dates]
      .filter(date => new Date(date.end) >= now)
      .sort((first, second) => new Date(first.start).getTime() - new Date(second.start).getTime())[0];
  }

  public getDatesLabel(activity: Activity): string {
    return `${activity.dates.length} ${activity.dates.length === 1 ? 'fecha' : 'fechas'}`;
  }

}
