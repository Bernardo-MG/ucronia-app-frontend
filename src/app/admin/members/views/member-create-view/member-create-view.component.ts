import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from '@app/admin/members/services/member.service';
import { Member } from '@app/models/member';

@Component({
  selector: 'crud-member-create-view',
  templateUrl: './member-create-view.component.html',
  styleUrls: ['./member-create-view.component.sass']
})
export class MemberCreateViewComponent {

  private member = new Member();

  private formValid = false;

  constructor(
    private service: MemberService,
    private router: Router
  ) { }

  public onSave(): void {
    this.service.create(this.member).subscribe(d => {
      this.router.navigate([`/members/${d.id}`]);
    });
  }

  public onFormValidChange(valid: boolean): void {
    this.formValid = valid;
  }

  public onFormChange(value: Member) {
    this.member = value;
  }

  public isAbleToSave() {
    return this.formValid;
  }

}
