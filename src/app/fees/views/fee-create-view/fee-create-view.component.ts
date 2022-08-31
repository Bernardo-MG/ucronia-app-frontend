import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FeeService } from '@app/fees/services/fee.service';
import { Fee } from '@app/models/fee';
import { Member } from '@app/models/member';

@Component({
  selector: 'fee-create-view',
  templateUrl: './fee-create-view.component.html',
  styleUrls: ['./fee-create-view.component.sass']
})
export class FeeCreateViewComponent {

  public members: Member[] = [];

  constructor(
    private service: FeeService,
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
