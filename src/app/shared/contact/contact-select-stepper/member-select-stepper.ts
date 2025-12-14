
import { Component, input, OnInit, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Member } from "@ucronia/domain";
import { MemberStatus } from "@ucronia/domain";
import { NameNumber } from '@app/shared/data/model/name-number';
import { SelectionList } from '@app/shared/data/selection-list/selection-list';
import { PaginatedResponse } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { StepperModule } from 'primeng/stepper';
import { EMPTY, Observable } from 'rxjs';
import { MemberStatusSelectComponent } from '../member-status-select/member-status-select.component';

@Component({
  selector: 'assoc-member-select-stepper',
  imports: [FormsModule, ButtonModule, CardModule, ReactiveFormsModule, StepperModule, MemberStatusSelectComponent, SelectionList],
  templateUrl: './member-select-stepper.html'
})
export class MemberSelectStepper implements OnInit {

  public readonly getMemberSelection = input<(page: number, active: MemberStatus) => Observable<PaginatedResponse<Member>>>((page: number, active: MemberStatus) => EMPTY);

  public readonly selectMember = output<NameNumber>();

  public readonly nameRenderer = (data: Member): string => data.name.fullName;

  public getSelection: (page: number) => Observable<PaginatedResponse<Member>> = (page: number) => EMPTY;

  public currentStep = 1;

  public ngOnInit(): void {
    this.getSelection = (page: number) => this.getMemberSelection()(page, MemberStatus.Active);
  }

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
