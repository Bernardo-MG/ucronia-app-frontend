import { Component } from '@angular/core';
import { Member } from '@app/models/member';
import { AdminMemberService } from '../../services/admin-member.service';

@Component({
  selector: 'admin-member-list-view',
  templateUrl: './admin-member-list-view.component.html',
  styleUrls: ['./admin-member-list-view.component.sass']
})
export class AdminMemberListViewComponent {

  public members: Member[] = [];

  constructor(
    private service: AdminMemberService
  ) {
    this.service.getAll().subscribe(d => this.members = d);
  }

  delete(id: number): void {
    this.service.delete(id).subscribe(d => {
      this.service.getAll().subscribe(d => this.members = d);
    });
  }

}
