import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Active } from '@app/association/members/models/active';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { IconsModule } from '@app/shared/icons/icons.module';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { Observable } from 'rxjs';
import { Member } from '../../../../members/models/member';
import { FeePayment } from '../../../models/fee-payment';
import { FeeService } from '../../../services/fee.service';
import { FeePayFormComponent } from '../fee-pay-form/fee-pay-form.component';
import { FeePaySelectMemberComponent } from '../fee-pay-select-member/fee-pay-select-member.component';

@Component({
  selector: 'assoc-fee-create',
  standalone: true,
  imports: [CommonModule, IconsModule, FeePayFormComponent, ArticleComponent, FeePaySelectMemberComponent],
  templateUrl: './fee-pay.component.html'
})
export class FeePayComponent extends CreateComponent<FeePayment> implements OnInit {

  public readingMembers = false;

  public selectedMember = false;

  public createPermission = false;

  public memberPage = new PaginatedResponse<Member[]>([]);

  public member = new Member();

  public activeFilter = Active.Active;

  public currentStep = 1;

  constructor(
    private service: FeeService,
    private authContainer: AuthContainer,
    rt: Router
  ) {
    super(rt);
  }

  public ngOnInit(): void {
    // Check permissions
    this.createPermission = this.authContainer.hasPermission("fee", "create");
    this.onGoToMembersPage(0);
  }

  public onChangeActiveFilter(active: Active) {
    this.activeFilter = active;
    this.onGoToMembersPage(0);
  }

  protected override save(toSave: FeePayment): Observable<FeePayment> {
    return this.service.pay(toSave);
  }

  protected override getReturnRoute(saved: FeePayment): string {
    return '/fees';
  }

  public onGoToMembersPage(page: number) {
    this.readingMembers = true;
    // TODO: The page correction should be done automatically
    this.service.getMembers(page, this.activeFilter).subscribe({
      next: response => {
        this.memberPage = response;

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

  public onSelectMember(member: Member) {
    this.member = member;
    this.selectedMember = true;
    this.currentStep = 2;
  }

  public isReturnDisabled() {
    return this.currentStep < 2;
  }

}
