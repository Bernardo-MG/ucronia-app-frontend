import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
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

  public fields: FormDescription[] = [
    new FormDescription('Name', 'name', 'string', Validators.required),
    new FormDescription('Surname', 'surname', 'string'),
    new FormDescription('Identifier', 'identifier', 'string'),
    new FormDescription('Phone', 'phone', 'string'),
    new FormDescription('Active', 'active', 'boolean', Validators.required)
  ];

  public failures: Failure[] = [];

  constructor(
    private service: MemberService,
    private router: Router
  ) { }

  public onSave(data: Member): void {
    this.saving = true;
    this.service.create(data).subscribe({
      next: d => {
        this.router.navigate([`/members/${d.id}`]);
        this.failures = [];
        // Reactivate view
        this.saving = false;
      },
      error: error => {
        this.failures = error.failures;
        // Reactivate view
        this.saving = false;
      }
    });
  }

}
