import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PageInfo } from '@app/api/models/page-info';
import { Fee } from '@app/models/fee';
import { Member } from '@app/models/member';
import { FeeService } from '../../services/fee.service';

@Component({
  selector: 'admin-fee-create-view',
  templateUrl: './fee-create-view.component.html',
  styleUrls: ['./fee-create-view.component.sass']
})
export class FeeCreateViewComponent {

  public members: Member[] = [];

  public member = new Member();

  public membersPageInfo = new PageInfo();

  public fee: Fee = new Fee();

  public selectingMember = false;

  private formValid = false;

  constructor(
    private service: FeeService,
    private router: Router
  ) { }

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
