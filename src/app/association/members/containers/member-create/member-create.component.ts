import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Member } from '@app/association/models/member';
import { Failure } from '@app/core/api/models/failure';
import { FormDescription } from '@app/shared/edition/models/form-description';
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

  public failures: Map<string, Failure[]> = new Map<string, Failure[]>();

  public fields: FormDescription[];

  constructor(
    private service: MemberService,
    private router: Router
  ) {
    this.fields = service.getFields();
  }

  public onSave(data: Member): void {
    this.saving = true;
    this.service.create(data).subscribe({
      next: d => {
        this.router.navigate([`/members/${d.id}`]);
        this.failures = new Map<string, Failure[]>();
        // Reactivate view
        this.saving = false;
      },
      error: error => {
        this.failures = this.getFailures(error.failures);
        // Reactivate view
        this.saving = false;
      }
    });
  }

  private getFailures(values: Failure[]) {
    const fieldFailures = new Map<string, Failure[]>();
    for (const failure of values) {
      if (failure.field) {
        if (fieldFailures.get(failure.field)) {
          const values = (fieldFailures.get(failure.field) as Failure[]);
          values.push(failure);
          fieldFailures.set(failure.field, values);
        } else {
          fieldFailures.set(failure.field, [failure]);
        }
      }
    }

    return fieldFailures;
  }

}
