import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookLent } from '@app/models/library/book-lent';
import { Member } from '@app/models/members/member';
import { Active } from '@app/models/person/active';
import { MemberStatusSelectComponent } from '@app/shared/person/components/member-status-select/member-status-select.component';
import { IconBackwardComponent } from '@bernardo-mg/icons';
import { BlockUiDirective, ResponsiveShortColumnsDirective } from '@bernardo-mg/ui';
import { FailureStore, PaginatedResponse } from '@bernardo-mg/request';
import { BookInfo } from '../../../../../models/library/book-info';
import { LibraryAdminBookLendingFormComponent } from '../library-admin-book-lending-form/library-admin-book-lending-form.component';
import { LibraryAdminBookLendingMemberSelectionComponent } from '../library-admin-book-lending-member-selection/library-admin-book-lending-member-selection.component';

@Component({
  selector: 'assoc-library-admin-book-lending',
  imports: [CommonModule, LibraryAdminBookLendingMemberSelectionComponent, MemberStatusSelectComponent, LibraryAdminBookLendingFormComponent, IconBackwardComponent, ResponsiveShortColumnsDirective, BlockUiDirective],
  templateUrl: './library-admin-book-lending.component.html'
})
export class LibraryAdminBookLendingLendComponent {

  @Input() public readonly = false;

  @Input() public waiting = false;

  @Input() public failures = new FailureStore();

  @Input() public book = new BookInfo();

  @Input() public members = new PaginatedResponse<Member>();

  @Output() public save = new EventEmitter<BookLent>();

  @Output() public goToMembersPage = new EventEmitter<number>();

  @Output() public changeFilter = new EventEmitter<Active>();

  public filled_bar = 0;

  public selectedMember = false;

  public member = new Member();

  public onReturnToMembers() {
    this.selectedMember = false;
    this.filled_bar = 0;
  }

  public onSelectMember(member: Member) {
    this.member = member;
    this.selectedMember = true;
    this.filled_bar = 50;
  }

}
