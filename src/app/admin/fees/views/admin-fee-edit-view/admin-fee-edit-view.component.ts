import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Fee } from '@app/models/fee';
import { FeeYear } from '@app/models/fee-year';
import { Member } from '@app/models/member';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { AdminFeeService } from '../../services/admin-fee.service';

@Component({
  selector: 'app-admin-fee-edit-view',
  templateUrl: './admin-fee-edit-view.component.html',
  styleUrls: ['./admin-fee-edit-view.component.sass']
})
export class AdminFeeEditViewComponent {

  public members: Member[] = [];
  
  public saveIcon = faFloppyDisk;

  public disabledSave: boolean = false;

  constructor(
    private service: AdminFeeService,
    private router: Router
  ) {
    this.service.getAllMembers().subscribe(d => this.members = d);
  }

  save(data: Fee): void {
    this.service.create(data).subscribe(d => {
      this.router.navigate(['/admin/fee']);
    });
  }

}
