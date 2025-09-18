
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Fee } from '@app/domain/fees/fee';
import { FeePayment } from '@app/domain/fees/fee-payment';
import { Member } from '@app/domain/members/member';
import { Active } from '@app/domain/person/active';
import { AuthContainer } from '@bernardo-mg/authentication';
import { CreateComponent } from '@bernardo-mg/form';
import { ResponsiveShortColumnsDirective } from '@bernardo-mg/ui';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { StepperModule } from 'primeng/stepper';
import { Observable } from 'rxjs';
import { FeeCreationForm } from '../../components/fee-creation-form/fee-creation-form';
import { FeePayForm } from '../../components/fee-pay-form/fee-pay-form';
import { FeePaySelectMember } from '../../components/fee-pay-select-member/fee-pay-select-member';
import { FeeService } from '../../services/fee-service';

@Component({
  selector: 'assoc-fee-create',
  imports: [FormsModule, ButtonModule, CardModule, ReactiveFormsModule, StepperModule, FeePayForm, FeeCreationForm, FeePaySelectMember, ResponsiveShortColumnsDirective],
  templateUrl: './fee-pay.html'
})
export class FeePay extends CreateComponent<FeePayment> {

  private readonly service = inject(FeeService);

  private readonly router = inject(Router);

  private readonly route = inject(ActivatedRoute);

  public loading = false;

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

  protected override handleSaveSuccess(saved: FeePayment) {
    super.handleSaveSuccess(saved);
    this.router.navigate(['..'], { relativeTo: this.route });
  }

}
