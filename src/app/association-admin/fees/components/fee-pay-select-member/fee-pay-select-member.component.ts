import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Active } from '@app/association/members/model/active';
import { MemberStatusSelectComponent } from '@app/association/members/shared/components/member-status-select/member-status-select.component';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Member } from '@app/models/members/member';
import { ButtonListComponent } from '@app/shared/layout/components/button-list/button-list.component';
import { BlockUiDirective } from '@app/shared/layout/directives/block-ui.directive';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { JustifyBetweenDirective } from '@app/shared/style/directives/justify-between.directive';

@Component({
  selector: 'app-fee-pay-select-member',
  standalone: true,
  imports: [ButtonListComponent, PaginationNavigationComponent, MemberStatusSelectComponent, JustifyBetweenDirective, BlockUiDirective],
  templateUrl: './fee-pay-select-member.component.html'
})
export class FeePaySelectMemberComponent {

  @Input() public data = new PaginatedResponse<Member[]>([]);

  @Input() public waiting = false;
  
  @Output() public selectMember = new EventEmitter<Member>();
  
  @Output() public goToPage = new EventEmitter<number>();
  
  @Output() public changeFilter = new EventEmitter<Active>();

  public nameRenderer(member: Member) {
    return member.name.fullName;
  }

}
