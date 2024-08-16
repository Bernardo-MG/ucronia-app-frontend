import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MemberStatusSelectComponent } from '@app/association/members/components/select/member-status-select/member-status-select.component';
import { Active } from '@app/association/members/models/active';
import { Member } from '@app/association/members/models/member';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { ButtonListComponent } from '@app/shared/layout/components/button-list/button-list.component';
import { WaitingOverlayComponent } from '@app/shared/layout/components/waiting-overlay/waiting-overlay.component';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { JustifyBetweenDirective } from '@app/shared/style/directives/justify-between.directive';
import { JustifyCenterDirective } from '@app/shared/style/directives/justify-center.directive';

@Component({
  selector: 'app-fee-pay-select-member',
  standalone: true,
  imports: [ButtonListComponent, WaitingOverlayComponent, PaginationNavigationComponent, MemberStatusSelectComponent, JustifyCenterDirective, JustifyBetweenDirective],
  templateUrl: './fee-pay-select-member.component.html'
})
export class FeePaySelectMemberComponent {

  @Input() public memberPage = new PaginatedResponse<Member[]>([]);

  @Input() public waiting = false;
  
  @Output() public selectMember = new EventEmitter<Member>();
  
  @Output() public goToPage = new EventEmitter<number>();
  
  @Output() public changeFilter = new EventEmitter<Active>();

  public nameRenderer(member: Member) {
    return member.name.fullName;
  }

}
