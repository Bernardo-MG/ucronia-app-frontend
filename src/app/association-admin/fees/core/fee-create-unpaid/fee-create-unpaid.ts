
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Fee } from '@app/domain/fees/fee';
import { Member } from '@app/domain/members/member';
import { Active } from '@app/domain/person/active';
import { MemberSelectStepper } from '@app/shared/person/components/member-select-stepper/member-select-stepper';
import { FailureResponse, FailureStore } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { StepperModule } from 'primeng/stepper';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { throwError } from 'rxjs';
import { FeeCreationForm } from '../fee-creation-form/fee-creation-form';
import { FeeService } from '../fee-service/fee-service';

@Component({
  selector: 'assoc-fee-create-unpaid',
  imports: [FormsModule, ButtonModule, CardModule, ToggleSwitchModule, ReactiveFormsModule, StepperModule, MemberSelectStepper, FeeCreationForm],
  templateUrl: './fee-create-unpaid.html'
})
export class FeeCreateUnpaid {

  public readonly service = inject(FeeService);

  public member = new Member();

  public failures = new FailureStore();

  public loading = false;

  public onCreateUnpaid(data: Fee): void {
    this.loading = true;
    this.service.create(data).subscribe({
      next: response => {
        this.failures.clear();

        // Reactivate component
        this.loading = false;
      },
      error: error => {
        if (error instanceof FailureResponse) {
          this.failures = error.failures;
        } else {
          // No failure response
          // Just remove the failures
          this.failures.clear();
        }

        return throwError(() => error);
      }
    });
  }

  public onGetSelection(page: number, active: Active) {
    return this.service.getPersons(page, active);
  }

  public onSelectMember(member: any) {
    this.member = (member as Member);
  }

}
