import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from '@app/admin/members/services/member.service';
import { Member } from '@app/models/member';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'admin-member-create-view',
  templateUrl: './member-create-view.component.html',
  styleUrls: ['./member-create-view.component.sass']
})
export class MemberCreateViewComponent {

  /**
   * Loading flag.
   */
  public waiting = false;

  public saveIcon = faFloppyDisk;

  private member = new Member();

  private formValid = false;

  constructor(
    private service: MemberService,
    private router: Router
  ) { }

  public onSave(): void {
    this.waiting = true;
    this.service.create(this.member).subscribe({
      next: d => {
        this.router.navigate([`/members/${d.id}`]);
        // Reactivate view
        this.waiting = false;
      },
      error: error => {
        // Reactivate view
        this.waiting = false;
      }
    });
  }

  public onFormValidChange(valid: boolean): void {
    this.formValid = valid;
  }

  public onFormChange(value: Member) {
    this.member = value;
  }

  public isAbleToSave() {
    return ((this.formValid) && (!this.waiting));
  }

}
