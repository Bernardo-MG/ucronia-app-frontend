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

  public feeYears: FeeYear[] = [];

  public range: FeeYearRange = new FeeYearRange();

  public year: number = -1;

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
    return ((this.range.end > 0) && (this.year < this.range.end));
  }

  public isAbleToGoBackwards() {
    return ((this.range.start > 0) && (this.year > this.range.start));
  }

  private toYear(year: number) {
    this.service.getAllForYear(year).subscribe(d => this.feeYears = d);
  }

}
