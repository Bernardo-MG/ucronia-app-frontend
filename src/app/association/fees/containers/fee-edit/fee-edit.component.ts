import { AfterContentInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Fee } from '@app/association/models/fee';
import { Member } from '@app/association/models/member';
import { PageInfo } from '@app/shared/utils/api/models/page-info';
import { FeeService } from '../../services/fee.service';
import { TitleValue } from '@app/shared/layout/models/link';

@Component({
  selector: 'assoc-fee-edit',
  templateUrl: './fee-edit.component.html',
  styleUrls: ['./fee-edit.component.sass']
})
export class FeeEditComponent implements OnInit, AfterContentInit {

  public members: TitleValue[] = [];

  public member = new Member();

  public membersPageInfo = new PageInfo();

  public fee = new Fee();

  public selectingMember = false;

  private formValid = false;

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
    this.selectingMember = false;
  }

  public onGoToMembersPage(page: number) {
    this.service.getMembers(page).subscribe(response => {
      this.members = response.content.map(v => this.toValue(v));
      this.membersPageInfo = response;
    });
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

  private toValue(member: Member) {
    return {
      title: `${member.name} ${member.surname}`,
      value: member
    }
  }

}
