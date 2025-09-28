
import { Component, input, output } from '@angular/core';
import { BookInfo } from '@app/domain/library/book-info';
import { BookLent } from '@app/domain/library/book-lent';
import { Member } from '@app/domain/members/member';
import { Active } from '@app/domain/person/active';
import { SelectionList } from '@app/shared/data/selection-list/selection-list';
import { MemberStatusSelectComponent } from '@app/shared/person/components/member-status-select/member-status-select.component';
import { FailureStore, PaginatedResponse } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { EMPTY, Observable } from 'rxjs';
import { LibraryBookLendingForm } from '../library-book-lending-form/library-book-lending-form';

@Component({
  selector: 'assoc-library-book-lending',
  imports: [ButtonModule, StepperModule, MemberStatusSelectComponent, LibraryBookLendingForm, SelectionList],
  templateUrl: './library-book-lending.html'
})
export class LibraryBookLending {

  public readonly getMemberSelection = input<(page: number, active: Active) => Observable<PaginatedResponse<any>>>((page: number, active: Active) => EMPTY);

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
