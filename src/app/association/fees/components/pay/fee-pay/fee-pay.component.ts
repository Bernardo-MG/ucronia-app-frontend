import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { WaitingWrapperComponent } from '@app/shared/layout/components/waiting-wrapper/waiting-wrapper.component';
import { Observable } from 'rxjs';
import { Member } from '../../../../members/models/member';
import { FeePayment } from '../../../models/fee-payment';
import { FeePaymentMember } from '../../../models/fee-payment-member';
import { FeeService } from '../../../services/fee.service';
import { FeeMemberSelectionComponent } from '../../edit/fee-member-selection/fee-member-selection.component';
import { FeePayFormComponent } from '../fee-pay-form/fee-pay-form.component';

@Component({
  selector: 'assoc-fee-create',
  standalone: true,
  imports: [CommonModule, FeePayFormComponent, FeeMemberSelectionComponent, ArticleComponent, WaitingWrapperComponent],
  templateUrl: './fee-pay.component.html'
})
export class FeePayComponent extends CreateComponent<FeePayment> implements OnInit {

  public readingMembers = false;

  public selectedMember = false;

  public createPermission = false;

  public memberPage = new PaginatedResponse<Member[]>([]);

  public member = new Member();

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

  protected override save(toSave: FeePayment): Observable<FeePayment> {
    toSave.member = new FeePaymentMember();
    toSave.member.number = this.member.number;
    return this.service.pay(toSave);
  }

  protected override getReturnRoute(saved: FeePayment): string {
    return '/fees';
  }

  public onGoToMembersPage(page: number) {
    this.readingMembers = true;
    // TODO: The page correction should be done automatically
    this.service.getMembers(page).subscribe({
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

  public onSelectMember(member: Member) {
    this.member = member;
    this.selectedMember = true;
  }

}
