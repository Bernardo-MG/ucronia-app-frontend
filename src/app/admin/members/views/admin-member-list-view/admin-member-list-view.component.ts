import { Component } from '@angular/core';
import { Member } from '@app/models/member';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { AdminMemberService } from '../../services/admin-member.service';

@Component({
  selector: 'admin-member-list-view',
  templateUrl: './admin-member-list-view.component.html',
  styleUrls: ['./admin-member-list-view.component.sass']
})
export class AdminMemberListViewComponent {

  public members: Member[] = [];

  public addIcon = faCirclePlus;

  constructor(
    private service: AdminMemberService
  ) {
    this.service.getMembers().subscribe(d => this.members = d);
  }

}
