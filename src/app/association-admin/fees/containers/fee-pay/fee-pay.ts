
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Fee } from '@app/domain/fees/fee';
import { FeePayment } from '@app/domain/fees/fee-payment';
import { Active } from '@app/domain/person/active';
import { Person } from '@app/domain/person/person';
import { AuthContainer } from '@bernardo-mg/authentication';
import { CreateComponent } from '@bernardo-mg/form';
import { PaginatedResponse } from '@bernardo-mg/request';
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

  public personPage = new PaginatedResponse<Person>();

  public person = new Person();

  public activeFilter = Active.Active;

  public currentStep = 1;

  public pay = true;

  constructor() {
    super();

    const authContainer = inject(AuthContainer);

    // Check permissions
    this.createPermission = authContainer.hasPermission("fee", "create");

    // Load members
    this.onGoToMembersPage(0);
  }

  public onChangeActiveFilter(active: Active) {
    this.activeFilter = active;
    this.onGoToMembersPage(0);
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

  public onGoToMembersPage(page: number) {
    this.loading = true;
    // TODO: The page correction should be done automatically
    this.service.getPersons(page, this.activeFilter).subscribe({
      next: response => {
        this.personPage = response;

        // Reactivate view
        this.loading = false;
      },
      error: error => {
        // Reactivate view
        this.loading = false;
      }
    });
  }

  public onReturnToMembers() {
    this.currentStep = 1;
  }

  public onSelectPerson(person: Person) {
    this.person = person;
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
