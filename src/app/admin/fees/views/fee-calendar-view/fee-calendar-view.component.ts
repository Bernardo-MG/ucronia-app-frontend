import { Component } from '@angular/core';
import { FeeCalendarRange } from '@app/models/fee-calendar-range';
import { FeeCalendarRow } from '@app/models/fee-calendar-row';
import { AdminFeeService } from '../../services/admin-fee.service';
;

@Component({
  selector: 'admin-fee-calendar-view',
  templateUrl: './fee-calendar-view.component.html',
  styleUrls: ['./fee-calendar-view.component.sass']
})
export class FeeCalendarViewComponent {

  /**
   * Loading flag. Shows the loading visual cue.
   */
  public loading = false;

  public range = new FeeCalendarRange();

  public onlyActive = false;

  public rows: FeeCalendarRow[] = [];

  public year = new Date().getFullYear();

  constructor(
    private service: AdminFeeService
  ) {
    this.load(this.year);
    this.service.getRange().subscribe(d => this.range = d);
  }

  public onFilterActiveMembers(event: any) {
    this.onlyActive = event.checked;
    this.load(this.year);
  }

  public onYearChange(year: number) {
    this.year = year;
    this.load(year);
  }

  private load(year: number) {
    this.loading = true;

    this.service.getCalendar(year, this.onlyActive).subscribe({
      next: data => {
        this.rows = data;
        this.loading = false;
      },
      error: error => {
        // Reactivate view
        this.loading = false;
      }
    });
  }

}
