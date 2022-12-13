import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageInfo } from '@app/api/models/page-info';
import { Fee } from '@app/models/fee';
import { Member } from '@app/models/member';
import { FeeService } from '../../services/fee.service';

@Component({
  selector: 'crud-fee-edit-view',
  templateUrl: './fee-edit-view.component.html',
  styleUrls: ['./fee-edit-view.component.sass']
})
export class FeeEditViewComponent implements OnInit {

  public members: Member[] = [];

  public member = new Member();

  public membersPageInfo = new PageInfo();

  public fee: Fee = new Fee();

  public selectingMember = false;

  private formValid = false;

  constructor(
    private route: ActivatedRoute,
    private service: FeeService
  ) { }

  public ngOnInit(): void {
    this.onGoToMembersPage(0);
    this.route.paramMap.subscribe(params => {
      this.load(params.get('id'));
    });
  }

  public onSave(): void {
    this.service.update(this.member.id, this.fee).subscribe();
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
    this.selectingMember = false;
  }

  public onGoToMembersPage(page: number) {
    this.service.getMembers(page).subscribe(response => {
      this.members = response.content;
      this.membersPageInfo = response;
    });
  }

  private load(id: string | null): void {
    if (id) {
      const identifier: number = Number(id);
      this.service.getOne(identifier)
        .subscribe(d => {
          this.fee = d;
          this.service.getOneMember(this.fee.memberId).subscribe(d => this.member = d);
        });
    }
  }

}
