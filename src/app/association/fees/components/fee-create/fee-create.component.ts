import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Fee } from '@app/association/models/fee';
import { Member } from '@app/association/models/member';
import { Failure } from '@app/core/api/models/failure';
import { FeeService } from '../../services/fee.service';

@Component({
  selector: 'assoc-fee-create',
  templateUrl: './fee-create.component.html'
})
export class FeeCreateComponent {

  /**
   * Saving flag.
   */
  public saving = false;

  public readingMembers = false;

  public selectingMember = false;

  public members: Member[] = [];

  public member = new Member();

  public membersPage = 0;

  public membersTotalPages = 0;

  public failures: { [key: string]: Failure[] } = {};

  public memberId = 0;

  constructor(
    private service: FeeService,
    private router: Router
  ) { }

  public onSave(data: Fee): void {
    this.saving = true;
    this.service.create(data).subscribe({
      next: response => {
        this.router.navigate(['/fees']);
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

  public onGoToMembersPage(page: number) {
    this.readingMembers = true;
    this.service.getMembers(page).subscribe(response => {
      this.members = response.content;
      this.membersPage = response.page + 1;
      this.membersTotalPages = response.totalPages;
      this.readingMembers = false;
    });
  }

}
