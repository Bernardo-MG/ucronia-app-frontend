import { AfterContentInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

  public readingMembers = false;

  public valid = false;

  public editing = false;

  public editPermission = false;

  public deletePermission = false;

  public members: Member[] = [];

  public member = new Member();

  public data = new Fee();

  public selectingMember = false;

  public membersPage = 0;

  public membersTotalPages = 0;

  public failures = new Map<string, Failure[]>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: FeeService,
    private cdRef: ChangeDetectorRef,
    private authService: AuthService
  ) {}

  ngAfterContentInit(): void {
    this.cdRef.detectChanges();
  }

  public ngOnInit(): void {
    // Check permissions
    this.editPermission = this.authService.hasPermission("fee", "update");
    this.deletePermission = this.authService.hasPermission("fee", "delete");

    // Get id
    this.route.paramMap.subscribe(params => {
      this.load(params.get('id'));
    });

    // Get members
    this.onGoToMembersPage(0);
  }

  public onSaveCurrent(): void {
    this.onSave(this.data);
  }

  public onSave(toSave: Fee): void {
    this.data = toSave;
    this.saving = true;
    this.service.update(this.data.id, this.data).subscribe({
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
    this.service.delete(this.data.id).subscribe(r => {
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

  public onChange(changed: Fee) {
    this.data = changed;
  }

  public onValidityChange(valid: boolean) {
    this.valid = valid;
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
          this.service.getOneMember(this.data.memberId).subscribe(d => this.onSelectMember(d));
        });
    }
  }

  public onCancelSelectMember() {
    this.selectingMember = false;
  }

  public isEditable() {
    return this.editPermission && this.editing;
  }

}
