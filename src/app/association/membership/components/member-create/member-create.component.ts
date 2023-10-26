import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FailureResponse } from '@app/core/api/models/failure-response';
import { FieldFailures } from '@app/core/api/models/field-failures';
import { Member } from '../../models/member';
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

  public failures = new FieldFailures();

  constructor(
    private service: MemberService,
    private router: Router
  ) { }

  public onSave(data: Member): void {
    this.saving = true;
    this.service.create(data).subscribe({
      next: d => {
        this.router.navigate([`/membership/member/${d.id}`]);
        this.failures = new FieldFailures();
        // Reactivate view
        this.saving = false;
      },
      error: (error: FailureResponse) => {
        if (error.failures) {
          this.failures = error.failures;
        } else {
          this.failures = new FieldFailures();
        }
        // Reactivate view
        this.saving = false;
      }
    });
  }

}
