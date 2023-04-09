import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Member } from '@app/association/models/member';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'assoc-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.sass']
})
export class MemberCreateComponent {

  /**
   * Loading flag.
   */
  public saving = false;

  public formValid = false;

  private member = new Member();

  constructor(
    private service: MemberService,
    private router: Router
  ) { }

  public onSave(): void {
    this.saving = true;
    this.service.create(this.member).subscribe({
      next: d => {
        this.router.navigate([`/members/${d.id}`]);
        // Reactivate view
        this.saving = false;
      },
      error: error => {
        // Reactivate view
        this.saving = false;
      }
    });
  }

  public onFormValidChange(valid: boolean): void {
    this.formValid = valid;
  }

  public onFormChange(value: Member) {
    this.member = value;
  }

}
