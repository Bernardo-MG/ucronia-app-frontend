import { AfterContentInit, ChangeDetectorRef, Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Fee } from '@app/association/models/fee';
import { Member } from '@app/association/models/member';
import { Failure } from '@app/core/api/models/failure';
import { FormDescription } from '@app/shared/edition/models/form-description';
import { FeeService } from '../../services/fee.service';

@Component({
  selector: 'assoc-fee-create',
  templateUrl: './fee-create.component.html'
})
export class FeeCreateComponent implements AfterContentInit {

  /**
   * Saving flag.
   */
  public saving = false;

  public fields: FormDescription[] = [
    new FormDescription('Member', 'memberName', 'string', Validators.required),
    new FormDescription('Date', 'date', 'string'),
    new FormDescription('Paid', 'paid', 'boolean', Validators.required)
  ];

  public readingMembers = false;

  public members: Member[] = [];

  public member = new Member();

  public memberId = 0;

  public selectingMember = false;

  public membersPage = 0;

  public membersTotalPages = 0;

  public failures: Failure[] = [];

  constructor(
    private service: FeeService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) { }

  ngAfterContentInit(): void {
    this.cdRef.detectChanges();
  }

  public onSave(fee: Fee): void {
    this.saving = true;
    this.service.update(fee.id, fee).subscribe({
      next: d => {
        this.router.navigate([`/fees/${d.id}`]);
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

  public onRequestMember() {
    this.selectingMember = true;
  }

  public onSelectMember(member: Member) {
    this.member = member;
    this.memberId = member.id;
    this.selectingMember = false;
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

  public onCancelSelectMember() {
    this.selectingMember = false;
  }

}
