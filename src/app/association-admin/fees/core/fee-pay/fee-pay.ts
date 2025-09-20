
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeePayment } from '@app/domain/fees/fee-payment';
import { Member } from '@app/domain/members/member';
import { Active } from '@app/domain/person/active';
import { MemberSelectStepper } from '@app/shared/person/components/member-select-stepper/member-select-stepper';
import { FailureResponse, FailureStore } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { StepperModule } from 'primeng/stepper';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { throwError } from 'rxjs';
import { FeePayForm } from '../fee-pay-form/fee-pay-form';
import { FeeService } from '../fee-service/fee-service';

@Component({
  selector: 'assoc-fee-pay',
  imports: [FormsModule, ButtonModule, CardModule, ToggleSwitchModule, ReactiveFormsModule, StepperModule, FeePayForm, MemberSelectStepper],
  templateUrl: './fee-pay.html'
})
export class FeePay {

  private readonly service = inject(FeeService);

  public member = new Member();

  public failures = new FailureStore();

  public loading = false;

  public onPay(data: FeePayment): void {
    this.loading = true;
    this.service.pay(data).subscribe({
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
