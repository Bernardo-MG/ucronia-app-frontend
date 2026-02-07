
import { Component, input, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NameNumber } from '@app/shared/data/model/name-number';
import { SelectionList } from '@app/shared/data/selection-list/selection-list';
import { MemberStatusSelector } from '@app/shared/member/member-status-selector/member-status-selector';
import { FailureStore, Page } from '@bernardo-mg/request';
import { FeePayments, Member, MemberStatus } from '@ucronia/domain';
import { StepperModule } from 'primeng/stepper';
import { EMPTY, Observable } from 'rxjs';
import { FeePaymentsForm } from '../fee-payments-form/fee-payments-form';

@Component({
  selector: 'assoc-fee-payments-stepper',
  imports: [FormsModule, ReactiveFormsModule, StepperModule, SelectionList, MemberStatusSelector, FeePaymentsForm],
  templateUrl: './fee-payments-stepper.html'
})
export class FeePaymentsStepper {

  public readonly loading = input(false);
  public readonly failures = input(new FailureStore());
  public readonly member = input(new Member());
  public readonly getMemberSelection = input<(page: number | undefined, active: MemberStatus) => Observable<Page<Member>>>((page: number | undefined, active: MemberStatus) => EMPTY);

  public readonly selectMember = output<NameNumber>();
  public readonly save = output<FeePayments>();

  public readonly nameRenderer = (data: Member): string => data.name.fullName;

  public getSelection: (page: number) => Observable<Page<Member>> = (page: number) => this.getMemberSelection()(undefined, MemberStatus.Active);

  public currentStep = 1;

  public onReturnToMembers() {
    this.currentStep = 1;
  }

  public onChangeMemberStatus(active: MemberStatus) {
    this.getSelection = (page: number) => this.getMemberSelection()(page, active);
  }

  public onSelectMember(member: any) {
    this.currentStep = 2;
    this.selectMember.emit(member);
  }

}
