import { AfterContentInit, ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Fee } from '@app/association/models/fee';
import { Member } from '@app/association/models/member';
import { FeeService } from '../../services/fee.service';
import { Failure } from '@app/core/api/models/failure';

@Component({
  selector: 'assoc-fee-create',
  templateUrl: './fee-create.component.html'
})
export class FeeCreateComponent implements AfterContentInit {

  /**
   * Saving flag.
   */
  public saving = false;

  public readingMembers = false;

  public members: Member[] = [];

  public member = new Member();

  public memberId = 0;

  public fee = new Fee();

  public selectingMember = false;

  public formValid = false;

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

  public onSave(): void {
    this.saving = true;
    this.service.update(this.fee.id, this.fee).subscribe({
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

  public onFormValidChange(valid: boolean): void {
    this.formValid = valid;
  }

  public onFormChange(value: Fee) {
    this.fee = value;
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

  public isFormValid() {
    return (this.formValid && (this.memberId > 0))
  }

}
