import { Component, input, OnInit, output } from '@angular/core';
import { Member } from '@app/domain/members/member';
import { Active } from '@app/domain/person/active';
import { NameNumber } from '@app/shared/data/model/name-number';
import { SelectionList } from '@app/shared/data/selection-list/selection-list';
import { MemberStatusSelectComponent } from '@app/shared/person/components/member-status-select/member-status-select.component';
import { PaginatedResponse } from '@bernardo-mg/request';
import { JustifyBetweenDirective } from '@bernardo-mg/ui';
import { EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'app-fee-pay-select-member',
  imports: [MemberStatusSelectComponent, SelectionList, JustifyBetweenDirective],
  templateUrl: './fee-pay-select-member.html'
})
export class FeePaySelectMember implements OnInit {

  public readonly getMemberSelection = input<(page: number, active: Active) => Observable<PaginatedResponse<Member>>>((page: number, active: Active) => EMPTY);

  public readonly selectMember = output<NameNumber>();

  public readonly nameRenderer = (data: Member): string => data.name.fullName;

  public getSelection: (page: number) => Observable<PaginatedResponse<Member>> = (page: number) => EMPTY;

  public ngOnInit(): void {
    this.getSelection = (page: number) => this.getMemberSelection()(page, Active.Active);
  }

  public onChangeActiveFilter(active: Active) {
    this.getSelection = (page: number) => this.getMemberSelection()(page, active);
  }

}
