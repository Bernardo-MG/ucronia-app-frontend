import { Component } from '@angular/core';
import { FeeYear } from '@app/models/fee-year';
import { AdminFeeService } from '../../services/admin-fee.service';

@Component({
  selector: 'app-admin-fee-list-view',
  templateUrl: './admin-fee-list-view.component.html',
  styleUrls: ['./admin-fee-list-view.component.sass']
})
export class AdminFeeListViewComponent {

  public feeYears: FeeYear[] = [];

  public year: number = -1;

  constructor(
    private service: AdminFeeService
  ) {
    this.year = new Date().getFullYear();
    this.toYear(this.year);
  }

  public toPreviousYear() {
    this.year = this.year - 1;
    this.toYear(this.year);
  }

  public toNextYear() {
    this.year = this.year + 1;
    this.toYear(this.year);
  }

  private toYear(year: number) {
    this.service.getAllForYear(year).subscribe(d => this.feeYears = d);
  }

}
