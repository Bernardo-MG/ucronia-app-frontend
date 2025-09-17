import { Component, input, output } from '@angular/core';
import { Member } from '@app/domain/members/member';
import { Active } from '@app/domain/person/active';
import { Person } from '@app/domain/person/person';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { MemberStatusSelectComponent } from '@app/shared/person/components/member-status-select/member-status-select.component';
import { BlockUiDirective, ButtonListComponent, JustifyBetweenDirective } from '@bernardo-mg/ui';
import { PaginatedResponse } from '@bernardo-mg/request';

@Component({
  selector: 'app-fee-pay-select-member',
  imports: [ButtonListComponent, PaginationNavigationComponent, MemberStatusSelectComponent, JustifyBetweenDirective, BlockUiDirective],
  templateUrl: './fee-pay-select-member.html'
})
export class FeePaySelectMember {

  public readonly data = input(new PaginatedResponse<Member>());

  public readonly waiting = input(false);

  public readonly selectPerson = output<Person>();

  public readonly goToPage = output<number>();

  public readonly changeFilter = output<Active>();

  public readonly nameRenderer = (data: Person): string => data.name.fullName;

}
