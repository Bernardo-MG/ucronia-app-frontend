import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FailureResponse } from '@app/core/api/models/failure-response';
import { FieldFailures } from '@app/core/api/models/field-failures';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { throwError } from 'rxjs';
import { FeePayment } from '../../models/fee-payment';
import { Member } from '../../../members/models/member';
import { FeeService } from '../../services/fee.service';
import { FeePaymentMember } from '../../models/fee-payment-member';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';

@Component({
  selector: 'assoc-fee-create',
  templateUrl: './fee-pay.component.html'
})
export class FeePayComponent implements OnInit {

  /**
   * Saving flag.
   */
  public saving = false;

  public readingMembers = false;

  public selectedMember = false;

  public createPermission = false;

  public page = new PaginatedResponse<Member[]>([]);

  public member = new Member();

  public failures = new FieldFailures();

  constructor(
    private service: FeeService,
    private router: Router,
    private authContainer: AuthContainer
  ) { }

  public ngOnInit(): void {
    // Check permissions
    this.createPermission = this.authContainer.hasPermission("fee", "create");
    this.onGoToMembersPage(0);
  }

  public onSave(data: FeePayment): void {
    this.saving = true;
    data.member = new FeePaymentMember();
    data.member.number = this.member.number;
    this.service.pay(data).subscribe({
      next: response => {
        this.router.navigate(['/membership']);
        this.failures.clear();
        // Reactivate view
        this.saving = false;
      },
      error: error => {
        if (error instanceof FailureResponse) {
          this.failures = error.failures;
        } else {
          this.failures.clear();
        }
        // Reactivate view
        this.saving = false;

        return throwError(() => error);
      }
    });
  }

  public onGoToMembersPage(page: number) {
    this.readingMembers = true;
    // TODO: The page correction should be done automatically
    this.service.getMembers(page).subscribe({
      next: response => {
        this.page = response;

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
