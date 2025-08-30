
import { Component, input, output } from '@angular/core';
import { BookLent } from '@app/domain/library/book-lent';
import { Member } from '@app/domain/members/member';
import { Active } from '@app/domain/person/active';
import { MemberStatusSelectComponent } from '@app/shared/person/components/member-status-select/member-status-select.component';
import { IconBackwardComponent } from '@bernardo-mg/icons';
import { BlockUiDirective, ResponsiveShortColumnsDirective } from '@bernardo-mg/ui';
import { FailureStore, PaginatedResponse } from '@bernardo-mg/request';
import { BookInfo } from '@app/domain/library/book-info';
import { LibraryAdminBookLendingFormComponent } from '../library-admin-book-lending-form/library-admin-book-lending-form.component';
import { LibraryAdminBookLendingMemberSelectionComponent } from '../library-admin-book-lending-member-selection/library-admin-book-lending-member-selection.component';

@Component({
  selector: 'assoc-library-admin-book-lending',
  imports: [LibraryAdminBookLendingMemberSelectionComponent, MemberStatusSelectComponent, LibraryAdminBookLendingFormComponent, IconBackwardComponent, ResponsiveShortColumnsDirective, BlockUiDirective],
  templateUrl: './library-admin-book-lending.component.html'
})
export class LibraryAdminBookLendingLendComponent {

  public readonly readonly = input(false);

  public readonly waiting = input(false);

  public readonly failures = input(new FailureStore());

  public readonly book = input(new BookInfo());

  public readonly members = input(new PaginatedResponse<Member>());

  public readonly save = output<BookLent>();

  public readonly goToMembersPage = output<number>();

  public readonly changeFilter = output<Active>();

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
