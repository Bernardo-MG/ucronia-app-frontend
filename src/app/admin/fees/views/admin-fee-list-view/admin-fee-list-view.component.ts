import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Fee } from '@app/models/fee';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { AdminFeeService } from '../../services/admin-fee.service';

@Component({
  selector: 'app-admin-fee-list-view',
  templateUrl: './admin-fee-list-view.component.html',
  styleUrls: ['./admin-fee-list-view.component.sass']
})
export class AdminFeeListViewComponent {

  fees: Fee[] = [];
  
  public editIcon = faPenToSquare;

  constructor(
    private service: AdminFeeService,
    private router: Router
  ) {
    this.service.getAll().subscribe(d => this.fees = d);
  }

  save(data: Fee): void {
    this.service.create(data).subscribe(d => {
      this.router.navigate(['/admin/fee']);
    });
  }

}
