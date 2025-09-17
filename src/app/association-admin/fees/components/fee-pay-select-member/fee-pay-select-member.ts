import { Component, input, OnInit, output } from '@angular/core';
import { Member } from '@app/domain/members/member';
import { Active } from '@app/domain/person/active';
import { Person } from '@app/domain/person/person';
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

  public readonly data = input(new PaginatedResponse<Member>());

  public readonly loading = input(false);

  public readonly getMemberSelection = input<(page: number, active: Active) => Observable<PaginatedResponse<any>>>((page: number, active: Active) => EMPTY);

  public readonly selectMember = output<NameNumber>();

  public readonly nameRenderer = (data: Person): string => data.name.fullName;

  public activeFilter = Active.Active;

  public getSelection: (page: number) => Observable<PaginatedResponse<any>> = (page: number) => EMPTY;

  public ngOnInit(): void {
    this.getSelection = (page: number) => this.getMemberSelection()(page, this.activeFilter);
  }

  public onChangeActiveFilter(active: Active) {
    this.activeFilter = active;
    this.getSelection = (page: number) => this.getMemberSelection()(page, this.activeFilter);
  }

}
