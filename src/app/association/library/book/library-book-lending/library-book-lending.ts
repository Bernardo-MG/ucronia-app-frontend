
import { Component, input, output } from '@angular/core';
import { BookInfo } from '@app/domain/library/book-info';
import { BookLent } from '@app/domain/library/book-lent';
import { PublicMember } from '@app/domain/members/public-member';
import { Active } from '@app/domain/contact/active';
import { SelectionList } from '@app/shared/data/selection-list/selection-list';
import { MemberStatusSelectComponent } from '@app/shared/contact/components/member-status-select/member-status-select.component';
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

  public member = new PublicMember();

  public status = Active.Active;

  public onReturnToMembers() {
    this.currentStep = 1;
  }

  public onSelectMember(member: any) {
    this.member = (member as PublicMember);
    this.currentStep = 2;
  }

  public onGetSelection(page: number) {
    return this.getMemberSelection()(page, this.status);
  }

  public readonly nameRenderer = (row: PublicMember): string => row.name.fullName;

}
