import { AfterContentInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Fee } from '@app/association/models/fee';
import { Member } from '@app/association/models/member';
import { Failure } from '@app/core/api/models/failure';
import { FormDescription } from '@app/shared/edition/models/form-description';
import { FeeService } from '../../services/fee.service';

@Component({
  selector: 'assoc-fee-edit',
  templateUrl: './fee-edit.component.html'
})
export class FeeEditComponent implements OnInit, AfterContentInit {

  /**
   * Saving flag.
   */
  public saving = false;

  public fields: FormDescription[] = [
    new FormDescription('Date', 'date', 'month'),
    new FormDescription('Paid', 'paid', 'boolean', Validators.required)
  ];

  public readingMembers = false;

  public members: Member[] = [];

  public memberName = '';

  public memberId = 0;

  public fee = new Fee();

  public selectingMember = false;

  public membersPage = 0;

  public membersTotalPages = 0;

  public failures: Failure[] = [];

  constructor(
    private route: ActivatedRoute,
    private service: FeeService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngAfterContentInit(): void {
    this.cdRef.detectChanges();
  }

  public ngOnInit(): void {
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

  public onRequestMember() {
    this.selectingMember = true;
  }

  public onSelectMember(member: Member) {
    this.memberName = member.name + ' ' + member.surname;
    this.memberId = member.id;
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

  public isMissingMember(): boolean {
    return this.memberId <= 0;
  }

}
