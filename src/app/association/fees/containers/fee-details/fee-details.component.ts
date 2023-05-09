import { AfterContentInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fee } from '@app/association/models/fee';
import { Member } from '@app/association/models/member';
import { Failure } from '@app/core/api/models/failure';
import { AuthService } from '@app/core/authentication/services/auth.service';
import { FormDescription } from '@app/shared/edition/models/form-description';
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

  public members: Member[] = [];

  public member = new Member();

  public fee = new Fee();

  public selectingMember = false;

  public membersPage = 0;

  public membersTotalPages = 0;

  public failures: Failure[] = [];

  public fields: FormDescription[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: FeeService,
    private cdRef: ChangeDetectorRef,
    private authService: AuthService
  ) {
    this.fields = service.getFields();
  }

  ngAfterContentInit(): void {
    this.cdRef.detectChanges();
  }

  public ngOnInit(): void {
    this.editable = this.authService.hasPermission("fee", "update");
    this.deletable = this.authService.hasPermission("fee", "delete");

    this.onGoToMembersPage(0);
    this.route.paramMap.subscribe(params => {
      this.load(params.get('id'));
    });
  }

  public onSave(fee: Fee): void {
    this.saving = true;
    this.service.update(fee.id, fee).subscribe({
      next: d => {
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

  public onDelete(data: Member): void {
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
          this.fee = d;
          this.service.getOneMember(this.fee.memberId).subscribe(d => this.onSelectMember(d));
        });
    }
  }

  public onCancelSelectMember() {
    this.selectingMember = false;
  }

}
