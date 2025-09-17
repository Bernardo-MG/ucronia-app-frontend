import { Component, input, output } from '@angular/core';
import { Member } from '@app/domain/members/member';
import { Active } from '@app/domain/person/active';
import { Person } from '@app/domain/person/person';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { MemberStatusSelectComponent } from '@app/shared/person/components/member-status-select/member-status-select.component';
import { PaginatedResponse } from '@bernardo-mg/request';
import { BlockUiDirective, ButtonListComponent, JustifyBetweenDirective } from '@bernardo-mg/ui';

@Component({
  selector: 'app-fee-pay-select-member',
  imports: [ButtonListComponent, PaginationNavigationComponent, MemberStatusSelectComponent, JustifyBetweenDirective, BlockUiDirective],
  templateUrl: './fee-pay-select-member.html'
})
export class FeePaySelectMember {

  public readonly data = input(new PaginatedResponse<Member>());

  public readonly loading = input(false);

  public readonly selectPerson = output<Person>();

  public readonly goToPage = output<number>();

  public readonly changeFilter = output<Active>();

  public readonly nameRenderer = (data: Person): string => data.name.fullName;

}
