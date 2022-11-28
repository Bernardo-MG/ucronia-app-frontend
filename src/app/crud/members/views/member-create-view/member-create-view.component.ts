import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from '@app/crud/members/services/member.service';
import { Member } from '@app/models/member';
@Component({
  selector: 'crud-member-create-view',
  templateUrl: './member-create-view.component.html',
  styleUrls: ['./member-create-view.component.sass']
})
export class MemberCreateViewComponent {

  member: Member = new Member();

  constructor(
    private service: MemberService,
    private router: Router
  ) { }

  save(data: Member): void {
    this.service.create(data).subscribe(d => {
      this.router.navigate(['/data/members']);
    });
  }

}
