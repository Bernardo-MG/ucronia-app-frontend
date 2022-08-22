import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Fee } from '@app/models/fee';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { AdminFeeService } from '../../services/admin-fee.service';

@Component({
  selector: 'app-admin-fee-edit-view',
  templateUrl: './admin-fee-edit-view.component.html',
  styleUrls: ['./admin-fee-edit-view.component.sass']
})
export class AdminFeeEditViewComponent {

  fees: Fee[] = [];
  
  public saveIcon = faFloppyDisk;

  public disabledSave: boolean = false;

  constructor(
    private service: AdminFeeService,
    private router: Router
  ) {
    this.service.getAll().subscribe(d => this.fees = d);
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
