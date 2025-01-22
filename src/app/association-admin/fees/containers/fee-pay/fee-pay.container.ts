import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Active } from '@app/association/members/model/active';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { Fee } from '@app/models/fees/fee';
import { FeePayment } from '@app/models/fees/fee-payment';
import { Person } from '@app/models/person/person';
import { CardModule } from '@app/shared/card/card.module';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { FormModule } from '@app/shared/form/form.module';
import { BackwardIconComponent } from '@app/shared/icons/components/icon-backward/icon-backward.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { JustifyBetweenDirective } from '@app/shared/style/directives/justify-between.directive';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';
import { Observable } from 'rxjs';
import { FeeCreationFormComponent } from '../../components/fee-creation-form/fee-creation-form.component';
import { FeePayFormComponent } from '../../components/fee-pay-form/fee-pay-form.component';
import { FeePaySelectMemberComponent } from '../../components/fee-pay-select-member/fee-pay-select-member.component';
import { FeeService } from '../../services/fee.service';

@Component({
    selector: 'assoc-fee-create',
    imports: [CommonModule, FormModule, CardModule, FeePayFormComponent, FeeCreationFormComponent, ArticleComponent, FeePaySelectMemberComponent, BackwardIconComponent, JustifyBetweenDirective, ResponsiveShortColumnsDirective],
    templateUrl: './fee-pay.container.html'
})
export class FeePayContainer extends CreateComponent<FeePayment> implements OnInit {

  public readingMembers = false;

  public selectedMember = false;

  public createPermission = false;

  public personPage = new PaginatedResponse<Person[]>([]);

  public person = new Person();

  public activeFilter = Active.Active;

  public currentStep = 1;

  public pay = true;

  constructor(
    private service: FeeService,
    private authContainer: AuthContainer,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  public ngOnInit(): void {
    // Check permissions
    this.createPermission = this.authContainer.hasPermission("fee", "create");

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
    this.readingMembers = true;
    // TODO: The page correction should be done automatically
    this.service.getPersons(page, this.activeFilter).subscribe({
      next: response => {
        this.personPage = response;

        // Reactivate view
        this.readingMembers = false;
      },
      error: error => {
        // Reactivate view
        this.readingMembers = false;
      }
    });
  }

  public onReturnToMembers() {
    this.selectedMember = false;
    this.currentStep = 1;
  }

  public onSelectPerson(person: Person) {
    this.person = person;
    this.selectedMember = true;
    this.currentStep = 2;
  }

  public isReturnDisabled() {
    return this.currentStep < 2;
  }

  public onChangePay(event: any) {
    if (event.checked === undefined) {
      // If the status was not received, fall back to default
      this.pay = true;
    } else {
      this.pay = event.checked;
    }
  }

  protected override handleSaveSuccess(saved: FeePayment) {
    super.handleSaveSuccess(saved);
    this.router.navigate(['..'], { relativeTo: this.route });
  }

}
