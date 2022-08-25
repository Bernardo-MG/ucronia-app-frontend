import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Fee } from '@app/models/fee';
import { FeeYear } from '@app/models/fee-year';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { AdminFeeService } from '../../services/admin-fee.service';

@Component({
  selector: 'app-admin-fee-edit-view',
  templateUrl: './admin-fee-edit-view.component.html',
  styleUrls: ['./admin-fee-edit-view.component.sass']
})
export class AdminFeeEditViewComponent {

  public feeYears: FeeYear[] = [];

  public year: number = -1;
  
  public saveIcon = faFloppyDisk;

  public disabledSave: boolean = false;

  constructor(
    private service: AdminFeeService,
    private router: Router
  ) {
    this.year = new Date().getFullYear();
    this.service.getAllForYear(this.year).subscribe(d => this.feeYears = d);
  }

  public saveData() {
    this.router.navigate(['/admin/fee']);
  }

  save(data: Fee): void {
    this.service.create(data).subscribe(d => {
      this.router.navigate(['/admin/fee']);
    });
  }

}
