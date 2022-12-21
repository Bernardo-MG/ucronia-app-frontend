import { Component } from '@angular/core';
import { FeeYear } from '@app/models/fee-year';
import { FeeCalendarRange } from '../../models/fee-calendar-range';
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

  public feeYears: FeeYear[] = [];

  public range = new FeeCalendarRange();

  public year = -1;

  public onlyActive = false;

  constructor(
    private service: AdminFeeService
  ) {
    this.year = new Date().getFullYear();
    this.toCurrentYear();
    this.service.getRange().subscribe(d => this.range = d);
  }

  public toPreviousYear() {
    this.year = this.year - 1;
    this.toCurrentYear();
  }

  public toNextYear() {
    this.year = this.year + 1;
    this.toCurrentYear();
  }

  public isAbleToGoForwards() {
    return ((!this.loading) && (this.range.end > 0) && (this.year < this.range.end));
  }

  public isAbleToGoBackwards() {
    return ((!this.loading) && (this.range.start > 0) && (this.year > this.range.start));
  }

  public onFilterActiveMembers(event: any) {
    this.onlyActive = event.checked;
    this.toCurrentYear();
  }

  private toCurrentYear() {
    this.loading = true;

    this.service.getAllForYear(this.year, this.onlyActive).subscribe({
      next: years => {
        this.feeYears = years;
        this.loading = false;
      },
      error: error => {
        // Reactivate view
        this.loading = false;
      }
    });
  }

}
