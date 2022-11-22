import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageInfo } from '@app/api/models/page-info';
import { FeeService } from '@app/crud/fees/services/fee.service';
import { Fee } from '@app/models/fee';
import { Member } from '@app/models/member';

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

  constructor(
    private route: ActivatedRoute,
    private service: FeeService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.onGoToMembersPage(0);
    this.route.paramMap.subscribe(params => {
      this.load(params.get('id'));
    });
  }

  public onSave(data: Fee): void {
    this.service.update(data.id, data).subscribe(d => {
      this.router.navigate(['/data/fees']);
    });
  }

  public onDelete(id: number): void {
    this.service.delete(id).subscribe(d => {
      this.router.navigate(['/data/fees']);
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
