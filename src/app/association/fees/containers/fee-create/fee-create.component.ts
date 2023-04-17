import { AfterContentInit, ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Fee } from '@app/association/models/fee';
import { Member } from '@app/association/models/member';
import { PageInfo } from '@app/shared/utils/api/models/page-info';
import { FeeService } from '../../services/fee.service';

@Component({
  selector: 'assoc-fee-create',
  templateUrl: './fee-create.component.html',
  styleUrls: ['./fee-create.component.sass']
})
export class FeeCreateComponent implements AfterContentInit {

  /**
   * Saving flag.
   */
  public saving = false;

  public readingMembers: boolean = false;

  public members: Member[] = [];

  public member = new Member();

  public fee = new Fee();

  public selectingMember = false;

  public formValid = false;

  public membersPage = 0;

  public membersTotalPages = 0;

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
    this.service.create(this.fee).subscribe(d => {
      this.router.navigate([`/fees/${d.id}`]);
      this.saving = false;
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
