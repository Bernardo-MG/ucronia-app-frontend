import { Component } from '@angular/core';
import { FeeYear } from '@app/models/fee-year';
import { FeeYearRange } from '../../models/fee-year-range';
import { AdminFeeService } from '../../services/admin-fee.service';

@Component({
  selector: 'app-admin-fee-list-view',
  templateUrl: './admin-fee-list-view.component.html',
  styleUrls: ['./admin-fee-list-view.component.sass']
})
export class AdminFeeListViewComponent {

  /**
   * Loading flag. Shows the loading visual cue.
   */
  public loading = false;

  public feeYears: FeeYear[] = [];

  public range = new FeeYearRange();

  public year = -1;

  constructor(
    private service: AdminFeeService
  ) {
    this.year = new Date().getFullYear();
    this.toYear(this.year);
    this.service.getRange().subscribe(d => this.range = d);
  }

  public toPreviousYear() {
    this.year = this.year - 1;
    this.toYear(this.year);
  }

  public toNextYear() {
    this.year = this.year + 1;
    this.toYear(this.year);
  }

  public isAbleToGoForwards() {
    return ((!this.loading) && (this.range.end > 0) && (this.year < this.range.end));
  }

  public isAbleToGoBackwards() {
    return ((!this.loading) && (this.range.start > 0) && (this.year > this.range.start));
  }

  private toYear(year: number) {
    this.loading = true;
    this.service.getAllForYear(year).subscribe({
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
