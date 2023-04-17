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

  public members: Member[] = [];

  public member = new Member();

  public membersPageInfo = new PageInfo();

  public fee: Fee = new Fee();

  public selectingMember = false;

  private formValid = false;

  constructor(
    private service: FeeService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) { }

  ngAfterContentInit(): void {
    this.cdRef.detectChanges();
  }

  public onSave(): void {
    this.service.create(this.fee).subscribe(d => {
      this.router.navigate([`/fees/${d.id}`]);
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
    this.service.getMembers(page).subscribe(response => {
      this.members = response.content;
      this.membersPageInfo = response;
    });
  }

  public isAbleToSave() {
    return this.formValid;
  }

}
