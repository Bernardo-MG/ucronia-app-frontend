import { AfterContentInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Fee } from '@app/association/models/fee';
import { Member } from '@app/association/models/member';
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

  public readingMembers = false;

  public members: Member[] = [];

  public member = new Member();

  public memberId = 0;

  public fee = new Fee();

  public selectingMember = false;

  public formValid = false;

  public membersPage = 0;

  public membersTotalPages = 0;

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

  public onSave(): void {
    this.service.update(this.fee.id, this.fee).subscribe();
  }

  public onFormValidChange(valid: boolean): void {
    this.formValid = valid;
  }

  public onFormChange(value: Fee) {
    this.fee = value;
  }

  public isAbleToSave() {
    return this.formValid;
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
    this.service.getMembers(page).subscribe(response => {
      this.members = response.content;
      this.membersPage = response.page + 1;
      this.membersTotalPages = response.totalPages;
    });
  }

  public isFormValid() {
    return (this.formValid && (this.memberId > 0))
  }

  private load(id: string | null): void {
    if (id) {
      const identifier = Number(id);
      this.service.getOne(identifier)
        .subscribe(d => {
          this.fee = d;
          this.service.getOneMember(this.fee.memberId).subscribe(d => this.member = d);
        });
    }
  }

  public onCancelSelectMember() {
    this.selectingMember = false;
  }

}
