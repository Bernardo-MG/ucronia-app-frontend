import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from '@app/members/services/member.service';
import { Member } from '@app/models/member';
@Component({
  selector: 'admin-member-create-view',
  templateUrl: './admin-member-create-view.component.html',
  styleUrls: ['./admin-member-create-view.component.sass']
})
export class AdminMemberCreateViewComponent {

  member: Member = new Member();

  constructor(
    private service: MemberService,
    private router: Router
  ) { }

  save(data: Member): void {
    this.service.create(data).subscribe(d => {
      this.router.navigate(['/admin/member']);
    });
  }

}
