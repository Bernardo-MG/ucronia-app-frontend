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
   * Reading flag.
   */
  public reading = false;

  /**
   * Saving flag.
   */
  public saving = false;

  public readingMembers = false;

  public editing = false;

  public editable = false;

  public deletable = false;

  public error = false;

  public members: Member[] = [];

  public member = new Member();

  public data = new Fee();

  public selectingMember = false;

  public membersPage = 0;

  public membersTotalPages = 0;

  public failures: { [key: string]: Failure[] } = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: FeeService,
    private cdRef: ChangeDetectorRef,
    private authService: AuthService
  ) { }

  ngAfterContentInit(): void {
    // TODO: What is this for?
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
  }

  public onSave(toSave: Fee): void {
    this.data = toSave;
    this.saving = true;
    this.service.update(this.data.id, this.data).subscribe({
      next: d => {
        this.failures = {};
        // Reactivate view
        this.saving = false;
        this.editing = false;
      },
      error: error => {
        if (error.failures) {
          this.failures = error.failures;
        } else {
          this.failures = {};
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

  public isAbleToEdit() {
    return (!this.error) && (!this.reading) && this.editable && !this.editing;
  }

  public isAbleToDelete() {
    return (!this.error) && (!this.reading) && this.deletable && (!this.editing);
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
      this.reading = true;
      const identifier = Number(id);
      this.service.getOne(identifier)
        .subscribe({
          next: d => {
            this.data = d;
            this.service.getOneMember(this.data.memberId).subscribe(d => this.onSelectMember(d));
            this.reading = false;
          },
          error: error => {
            this.reading = false;
            this.error = true;
          }
        });
    }
  }

  public onCancelSelectMember() {
    this.selectingMember = false;
  }

  public isEditable() {
    return this.editable && this.editing && (!this.error);
  }

  public isWaiting() {
    return this.reading || this.saving;
  }

}
