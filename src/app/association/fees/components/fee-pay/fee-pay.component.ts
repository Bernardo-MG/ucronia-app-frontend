import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fee } from '@app/association/models/fee';
import { Member } from '@app/association/models/member';
import { Failure } from '@app/core/api/models/failure';
import { AuthService } from '@app/core/authentication/services/auth.service';
import { FeeService } from '../../services/fee.service';
import { FeePayment } from '../../models/fee-payment';

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

  public members: Member[] = [];

  public member = new Member();

  public membersPage = 0;

  public membersTotalPages = 0;

  public failures: { [key: string]: Failure[] } = {};

  constructor(
    private service: FeeService,
    private router: Router,
    private authService: AuthService
  ) { }

  public ngOnInit(): void {
    // Check permissions
    this.createPermission = this.authService.hasPermission("fee", "create");
    this.onGoToMembersPage(0);
  }

  public onSave(data: FeePayment): void {
    this.saving = true;
    this.service.pay(data).subscribe({
      next: response => {
        this.router.navigate(['/fees']);
        this.failures = {};
        // Reactivate view
        this.saving = false;
      },
      error: error => {
        if (error.failures) {
          this.failures = error.failures;
        } else {
          this.failures = {};
        }
        // Reactivate view
        this.saving = false;
      }
    });
  }

  public onGoToMembersPage(page: number) {
    this.readingMembers = true;
    this.service.getMembers(page).subscribe({
      next: response => {
        this.members = response.content;
        this.membersPage = response.page + 1;
        this.membersTotalPages = response.totalPages;
        this.readingMembers = false;
      },
      error: error => {
        this.readingMembers = false;
      }
    });
  }

  public onSelectMember(member: Member) {
    this.member = member;
    this.selectedMember = true;
  }

  public getMemberName() {
    return this.member.name + ' ' + this.member.surname;
  }

}
