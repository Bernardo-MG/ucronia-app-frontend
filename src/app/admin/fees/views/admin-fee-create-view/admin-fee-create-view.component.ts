import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Fee } from '@app/models/fee';
import { Member } from '@app/models/member';
import { AdminFeeService } from '../../services/admin-fee.service';

@Component({
  selector: 'app-admin-fee-create-view',
  templateUrl: './admin-fee-create-view.component.html',
  styleUrls: ['./admin-fee-create-view.component.sass']
})
export class AdminFeeCreateViewComponent {

  public members: Member[] = [];

  constructor(
    private service: AdminFeeService,
    private router: Router
  ) {
    this.service.getAllMembers().subscribe(d => this.members = d);
  }

  save(data: Fee): void {
    this.service.create(data).subscribe(d => {
      this.router.navigate(['/admin/balance']);
    });
  }

}
