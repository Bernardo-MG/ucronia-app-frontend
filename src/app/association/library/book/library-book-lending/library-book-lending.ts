
import { Component, input, output } from '@angular/core';
import { SelectionList } from '@app/shared/data/selection-list/selection-list';
import { MemberStatusSelectComponent } from '@app/shared/profile/member-status-select/member-status-select.component';
import { FailureStore, PaginatedResponse } from '@bernardo-mg/request';
import { BookInfo, BookLent, Member, MemberStatus } from "@ucronia/domain";
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

  public readonly getMemberSelection = input<(page: number, active: MemberStatus) => Observable<PaginatedResponse<any>>>((page: number, active: MemberStatus) => EMPTY);
  public readonly waiting = input(false);
  public readonly failures = input(new FailureStore());
  public readonly book = input(new BookInfo());

  public readonly save = output<BookLent>();

  public currentStep = 1;

  public member = new Member();

  public status = MemberStatus.Active;

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
