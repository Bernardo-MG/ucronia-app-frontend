import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Failure } from '@app/core/api/models/failure';
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

  public failures: { [key: string]: Failure[] } = {};

  constructor(
    private service: MemberService,
    private router: Router
  ) { }

  public onSave(data: Member): void {
    this.saving = true;
    this.service.create(data).subscribe({
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

}