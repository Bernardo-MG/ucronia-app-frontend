import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Member } from '@app/models/members/member';
import { IconAddComponent } from '@app/shared/icons/components/icon-add/icon-add.component';
import { BlockUiDirective } from '@app/shared/layout/directives/block-ui.directive';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { JustifyCenterDirective } from '@app/shared/style/directives/justify-center.directive';

@Component({
    selector: 'access-user-select-member',
    imports: [CommonModule, PaginationNavigationComponent, JustifyCenterDirective, BlockUiDirective, IconAddComponent],
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
