
import { Component, input, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NameNumber } from '@app/shared/data/model/name-number';
import { SelectionList } from '@app/shared/data/selection-list/selection-list';
import { MemberStatusSelectComponent } from '@app/shared/profile/member-status-select/member-status-select.component';
import { Page } from '@bernardo-mg/request';
import { Member, MemberStatus } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { StepperModule } from 'primeng/stepper';
import { EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'assoc-member-select-stepper',
  imports: [FormsModule, ButtonModule, CardModule, ReactiveFormsModule, StepperModule, MemberStatusSelectComponent, SelectionList],
  templateUrl: './member-select-stepper.html'
})
export class MemberSelectStepper {

  public readonly getMemberSelection = input<(page: number | undefined, active: MemberStatus) => Observable<Page<Member>>>((page: number | undefined, active: MemberStatus) => EMPTY);

  public readonly selectMember = output<NameNumber>();

  public readonly nameRenderer = (data: Member): string => data.name.fullName;

  public getSelection: (page: number) => Observable<Page<Member>> = (page: number) => this.getMemberSelection()(undefined, MemberStatus.Active);

  public currentStep = 1;

  public onReturnToMembers() {
    this.currentStep = 1;
  }

  public onChangeActiveFilter(active: MemberStatus) {
    this.getSelection = (page: number) => this.getMemberSelection()(page, active);
  }

  public onSelectMember(member: any) {
    this.currentStep = 2;
    this.selectMember.emit(member);
  }

}
