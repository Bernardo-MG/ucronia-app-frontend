
import { Component, input, output } from '@angular/core';
import { SelectionList } from '@app/shared/data/selection-list/selection-list';
import { BookInfo } from '@app/domain/library/book-info';
import { BookLent } from '@app/domain/library/book-lent';
import { Member } from '@app/domain/members/member';
import { Active } from '@app/domain/person/active';
import { MemberStatusSelectComponent } from '@app/shared/person/components/member-status-select/member-status-select.component';
import { FailureStore, PaginatedResponse } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { EMPTY, Observable } from 'rxjs';
import { LibraryAdminBookLendingForm } from '../library-admin-book-lending-form/library-admin-book-lending-form';

@Component({
  selector: 'assoc-library-admin-book-lending',
  imports: [ButtonModule, StepperModule, MemberStatusSelectComponent, LibraryAdminBookLendingForm, SelectionList],
  templateUrl: './library-admin-book-lending.html'
})
export class LibraryAdminBookLendingLend {

  public readonly getMemberSelection = input<(page: number, active: Active) => Observable<PaginatedResponse<any>>>((page: number, active: Active) => EMPTY);

  public readonly readonly = input(false);

  public readonly waiting = input(false);

  public readonly failures = input(new FailureStore());

  public readonly book = input(new BookInfo());

  public readonly save = output<BookLent>();

  public currentStep = 1;

  public member = new Member();

  public status = Active.Active;

  public onReturnToMembers() {
    this.currentStep = 1;
  }

  public onSelectMember(member: any) {
    this.member = (member as Member);
    this.currentStep = 2;
  }

  public onGetSelection(page: number) {
    return this.getMemberSelection()(page, this.status);
  }

  public readonly nameRenderer = (row: Member): string => row.name.fullName;

}
