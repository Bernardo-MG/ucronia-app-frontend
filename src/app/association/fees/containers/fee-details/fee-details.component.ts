import { AfterContentInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Fee } from '@app/association/models/fee';
import { Member } from '@app/association/models/member';
import { Failure } from '@app/core/api/models/failure';
import { AuthService } from '@app/core/authentication/services/auth.service';
import { FeeService } from '../../services/fee.service';

@Component({
  selector: 'assoc-fee-details',
  templateUrl: './fee-details.component.html'
})
export class FeeDetailsComponent implements OnInit, AfterContentInit {

  /**
   * Saving flag.
   */
  public saving = false;

  public editable = false;

  public deletable = false;

  public readingMembers = false;

  public valid = false;

  public editing = false;

  public members: Member[] = [];

  public member = new Member();

  public data = new Fee();

  public selectingMember = false;

  public membersPage = 0;

  public membersTotalPages = 0;

  public failures: Map<string, Failure[]> = new Map<string, Failure[]>();

  public form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: FeeService,
    private cdRef: ChangeDetectorRef,
    private authService: AuthService,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      id: [-1],
      memberId: [null, Validators.required],
      date: [null, Validators.required],
      paid: [false, Validators.required]
    });
  }

  ngAfterContentInit(): void {
    this.cdRef.detectChanges();
  }

  public ngOnInit(): void {
    // Check permissions
    this.editable = this.authService.hasPermission("fee", "update");
    this.deletable = this.authService.hasPermission("fee", "delete");

    // Get id
    this.route.paramMap.subscribe(params => {
      this.load(params.get('id'));
    });

    // Get members
    this.onGoToMembersPage(0);

    // Listen for status changes
    this.form.statusChanges.subscribe(status => {
      this.valid = (status === "VALID");
    });
  }

  public onSave(): void {
    const data: Fee = this.form.value;
    this.saving = true;
    this.service.update(data.id, data).subscribe({
      next: d => {
        this.failures = new Map<string, Failure[]>()
        // Reactivate view
        this.saving = false;
        this.editing = false;
      },
      error: error => {
        if (error.failures) {
          this.failures = error.failures;
        } else {
          this.failures = new Map<string, Failure[]>();
        }
        // Reactivate view
        this.saving = false;
        this.editing = false;
      }
    });
  }

  public onDelete(): void {
    const data: Fee = this.form.value;
    this.service.delete(data.id).subscribe(r => {
      this.router.navigate([`/fees/list`]);
    });
  }

  public onRequestMember() {
    this.selectingMember = true;
  }

  public onSelectMember(member: Member) {
    this.member = member;
    this.selectingMember = false;
  }

  public onStartEditing(): void {
    this.editing = true;
  }

  public onGoToMembersPage(page: number) {
    this.service.getMembers(page).subscribe(response => {
      this.members = response.content;
      this.membersPage = response.page + 1;
      this.membersTotalPages = response.totalPages;
    });
  }

  private load(id: string | null): void {
    if (id) {
      const identifier = Number(id);
      this.service.getOne(identifier)
        .subscribe(d => {
          this.data = d;
          this.form.patchValue(this.data);
          this.service.getOneMember(this.data.memberId).subscribe(d => this.onSelectMember(d));
        });
    }
  }

  public onCancelSelectMember() {
    this.selectingMember = false;
  }

  public isEditable() {
    return this.editable && this.editing;
  }

}
