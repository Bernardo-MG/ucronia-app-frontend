import { Component, EventEmitter, Output, input } from '@angular/core';
import { Member } from '@app/models/members/member';
import { Active } from '@app/models/person/active';
import { Person } from '@app/models/person/person';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { MemberStatusSelectComponent } from '@app/shared/person/components/member-status-select/member-status-select.component';
import { BlockUiDirective, ButtonListComponent, JustifyBetweenDirective } from '@bernardo-mg/ui';
import { PaginatedResponse } from '@bernardo-mg/request';

@Component({
  selector: 'app-fee-pay-select-member',
  imports: [ButtonListComponent, PaginationNavigationComponent, MemberStatusSelectComponent, JustifyBetweenDirective, BlockUiDirective],
  templateUrl: './fee-pay-select-member.component.html'
})
export class FeePaySelectMemberComponent {

  public readonly data = input(new PaginatedResponse<Member>());

  public readonly waiting = input(false);

  @Output() public selectPerson = new EventEmitter<Person>();

  @Output() public goToPage = new EventEmitter<number>();

  @Output() public changeFilter = new EventEmitter<Active>();

  public nameRenderer = (data: Person): string => data.name.fullName;

}
