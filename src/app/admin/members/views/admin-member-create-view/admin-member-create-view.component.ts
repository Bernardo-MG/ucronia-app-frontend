import { Component, Input } from '@angular/core';
import { Member } from '@app/models/member';
import { AdminMemberService } from '../../services/admin-member.service';

@Component({
  selector: 'admin-member-create-view',
  templateUrl: './admin-member-create-view.component.html',
  styleUrls: ['./admin-member-create-view.component.sass']
})
export class AdminMemberCreateViewComponent {

  @Input() member: Member = new Member();

  constructor(
    private service: AdminMemberService
  ) { }

  save(): void {
    this.service.create(this.member);
  }

  updateAndSave(data: Member): void {
    this.member = data;
    this.service.create(this.member);
  }

}
