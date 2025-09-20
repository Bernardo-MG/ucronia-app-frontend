
import { Component, input, OnInit, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Member } from '@app/domain/members/member';
import { Active } from '@app/domain/person/active';
import { NameNumber } from '@app/shared/data/model/name-number';
import { SelectionList } from '@app/shared/data/selection-list/selection-list';
import { PaginatedResponse } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { StepperModule } from 'primeng/stepper';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { EMPTY, Observable } from 'rxjs';
import { MemberStatusSelectComponent } from '../member-status-select/member-status-select.component';

@Component({
  selector: 'assoc-member-select-stepper',
  imports: [FormsModule, ButtonModule, CardModule, ToggleSwitchModule, ReactiveFormsModule, StepperModule, MemberStatusSelectComponent, SelectionList],
  templateUrl: './member-select-stepper.html'
})
export class MemberSelectStepper implements OnInit {

  public readonly getMemberSelection = input<(page: number, active: Active) => Observable<PaginatedResponse<Member>>>((page: number, active: Active) => EMPTY);

  public readonly selectMember = output<NameNumber>();

  public readonly nameRenderer = (data: Member): string => data.name.fullName;

  public getSelection: (page: number) => Observable<PaginatedResponse<Member>> = (page: number) => EMPTY;

  public currentStep = 1;

  public pay = true;

  public ngOnInit(): void {
    this.getSelection = (page: number) => this.getMemberSelection()(page, Active.Active);
  }

  public onReturnToMembers() {
    this.currentStep = 1;
  }

  public onChangeActiveFilter(active: Active) {
    this.getSelection = (page: number) => this.getMemberSelection()(page, active);
  }

  public onSelectMember(member: any) {
    this.currentStep = 2;
    this.selectMember.emit(member);
  }

}
