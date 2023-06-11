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
export class FeeCreateComponent implements AfterContentInit, OnInit {

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

  public form: FormGroup;

  constructor(
    private service: FeeService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      memberId: [null, Validators.required],
      date: [null, Validators.required],
      paid: [false, Validators.required]
    });
  }

  public ngAfterContentInit(): void {
    this.cdRef.detectChanges();
  }

  public ngOnInit(): void {
    // Listen for status changes
    this.form.statusChanges.subscribe(status => {
      this.valid = (status === "VALID");
    });
  }

  public onSave(): void {
    const data: Fee = this.form.value;
    this.saving = true;
    data.memberId = this.member.id;
    this.service.create(data).subscribe({
      next: d => {
        this.router.navigate([`/fees/${d.id}`]);
        this.failures = new Map<string, Failure[]>();
        // Reactivate view
        this.saving = false;
      },
      error: error => {
        if(error.failures){
          this.failures = error.failures;
        } else {
          this.failures = new Map<string, Failure[]>();
        }
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
    this.form.patchValue({
      memberId:member.id
    });
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
