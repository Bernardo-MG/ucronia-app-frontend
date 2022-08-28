import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Fee } from '@app/models/fee';
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
    private service: AdminFeeService,
    private router: Router
  ) {
    this.year = new Date().getFullYear();
    this.service.getAllForYear(this.year).subscribe(d => this.feeYears = d);
  }

  save(data: Fee): void {
    this.service.create(data).subscribe(d => {
      this.router.navigate(['/admin/fee']);
    });
  }

}
