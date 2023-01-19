import { Component } from '@angular/core';import { UserFeeCalendar } from '@app/models/user-fee-calendar';
;
import { FeeCalendarRange } from '@app/models/fee-calendar-range';
import { FeeCalendarRow } from '@app/models/fee-calendar-row';
import { AdminFeeService } from '../../services/admin-fee.service';

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

  private months: number[] = Array(12).fill(0).map((x, i) => i + 1);

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

    this.service.getAllForYear(year, this.onlyActive).subscribe({
      next: years => {
        this.rows = this.transformToCalendar(years);
        this.loading = false;
      },
      error: error => {
        // Reactivate view
        this.loading = false;
      }
    });
  }

  private transformToCalendar(data: UserFeeCalendar[]): FeeCalendarRow[] {
    return data.map(year => {
      const row = new FeeCalendarRow();
      row.name = year.name;
      row.surname = year.surname;
      row.active = year.active;
      this.months.forEach(month => {
        const feeMonth = year.months.find(m => m.month === month);
        var column;

        if (feeMonth) {
          column = feeMonth.paid;
        } else {
          column = undefined;
        }
        row.months.push(column);
      });

      return row;
    });
  }

}
