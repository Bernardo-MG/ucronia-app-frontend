
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Fee } from '@app/domain/fees/fee';
import { FeePayment } from '@app/domain/fees/fee-payment';
import { Member } from '@app/domain/members/member';
import { Active } from '@app/domain/person/active';
import { AuthContainer } from '@bernardo-mg/authentication';
import { CreateComponent } from '@bernardo-mg/form';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { StepperModule } from 'primeng/stepper';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { Observable } from 'rxjs';
import { FeeCreationForm } from '../fee-creation-form/fee-creation-form';
import { FeePaySelectMember } from '../fee-pay-select-member/fee-pay-select-member';
import { FeeService } from '../fee-service/fee-service';

@Component({
  selector: 'assoc-fee-create',
  imports: [FormsModule, ButtonModule, CardModule, ToggleSwitchModule, ReactiveFormsModule, StepperModule, FeeCreationForm, FeePaySelectMember],
  templateUrl: './fee-create.html'
})
export class FeeCreate extends CreateComponent<FeePayment> {

  private readonly service = inject(FeeService);

  public readonly createPermission;

  public member = new Member();

  public currentStep = 1;

  public pay = true;

  constructor() {
    super();

    const authContainer = inject(AuthContainer);

    // Check permissions
    this.createPermission = authContainer.hasPermission("fee", "create");
  }

  public onCreateUnpaid(data: Fee): void {
    this.saving = true;
    this.service.create(data).subscribe({
      next: response => {
        this.handleSaveSuccess(response);
      },
      error: error => {
        return this.handleSaveFailure(error);
      }
    });
  }

  protected override save(toSave: FeePayment): Observable<FeePayment> {
    return this.service.pay(toSave);
  }

  public onGetSelection(page: number, active: Active) {
    return this.service.getPersons(page, active);
  }

  public onReturnToMembers() {
    this.currentStep = 1;
  }

  public onSelectMember(member: any) {
    this.member = (member as Member);
    this.currentStep = 2;
  }

  public onChangePay(event: any) {
    if (event.checked === undefined) {
      // If the status was not received, fall back to default
      this.pay = true;
    } else {
      this.pay = event.checked;
    }
    this.failures.clear();
  }

}
