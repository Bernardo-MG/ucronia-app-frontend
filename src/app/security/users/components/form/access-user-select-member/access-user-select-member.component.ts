import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Member } from '@app/association/members/models/member';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { IconsModule } from '@app/shared/icons/icons.module';
import { WaitingOverlayComponent } from '@app/shared/layout/components/waiting-overlay/waiting-overlay.component';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { JustifyCenterDirective } from '@app/shared/style/directives/justify-center.directive';

@Component({
  selector: 'access-user-select-member',
  standalone: true,
  imports: [CommonModule, IconsModule, WaitingOverlayComponent, PaginationNavigationComponent, JustifyCenterDirective],
  templateUrl: './access-user-select-member.component.html'
})
export class AccessUserSelectMemberComponent implements OnInit {

  @Input() public members = new PaginatedResponse<Member[]>([]);

  @Input() public waiting = false;

  @Output() public selectMember = new EventEmitter<Member>();

  @Output() public goToPage = new EventEmitter<number>();

  ngOnInit(): void {
    this.onGoToPage(0);
  }

  public onSelect(data: Member): void {
    this.selectMember.emit(data);
  }

  public onGoToPage(page: number): void {
    this.goToPage.emit(page);
  }

}
