import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Member } from '@app/association/models/member';
import { Failure } from '@app/core/api/models/failure';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'assoc-member-create',
  templateUrl: './member-create.component.html'
})
export class MemberCreateComponent {

  /**
   * Loading flag.
   */
  public saving = false;

  public valid = false;

  public failures: { [key: string]: Failure[] } = {};

  public data = new Member();

  constructor(
    private service: MemberService,
    private router: Router
  ) { }

  public onSave(toSave: Member): void {
    this.data = toSave;
    this.saving = true;
    this.service.create(this.data).subscribe({
      next: d => {
        this.router.navigate([`/members/${d.id}`]);
        this.failures = {};
        // Reactivate view
        this.saving = false;
      },
      error: error => {
        if (error.failures) {
          this.failures = error.failures;
        } else {
          this.failures = {};
        }
        // Reactivate view
        this.saving = false;
      }
    });
  }

  public onValidityChange(valid: boolean) {
    this.valid = valid;
  }

  public isAbleToSave() {
    return ((this.valid) && (!this.saving));
  }

}
