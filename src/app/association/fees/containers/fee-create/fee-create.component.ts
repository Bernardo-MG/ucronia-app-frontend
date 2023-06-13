import { AfterContentInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  public valid = false;

  public members: Member[] = [];

  public member = new Member();

  public selectingMember = false;

  public membersPage = 0;

  public membersTotalPages = 0;

  public failures = new Map<string, Failure[]>();

  public data = new Fee();

  public memberId = 0;

  constructor(
    private service: FeeService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) { }

  public ngAfterContentInit(): void {
    this.cdRef.detectChanges();
  }

  public onSaveCurrent(): void {
    this.onSave(this.data);
  }

  public onSave(toSave: Fee): void {
    this.data = toSave;
    this.saving = true;
    this.data.memberId = this.member.id;
    this.service.create(this.data).subscribe({
      next: d => {
        this.router.navigate([`/fees/${d.id}`]);
        this.failures = new Map<string, Failure[]>();
        // Reactivate view
        this.saving = false;
      },
      error: error => {
        if (error.failures) {
          this.failures = error.failures;
        } else {
          this.failures = new Map<string, Failure[]>();
        }
        // Reactivate view
        this.saving = false;
      }
    });
  }

  public onChange(changed: Fee) {
    this.data = changed;
  }

  public onValidityChange(valid: boolean) {
    this.valid = valid;
  }

  public onRequestMember() {
    this.selectingMember = true;
  }

  public onSelectMember(member: Member) {
    this.member = member;
    this.data = { ...this.data, memberId: member.id };
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

  public isAbleToSave() {
    return ((this.valid) && (!this.saving));
  }

}
