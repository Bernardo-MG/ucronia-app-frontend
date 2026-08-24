import { Component, inject } from '@angular/core';
import { AccountChangePasswordForm } from '@app/account/account-change-password-form/account-change-password-form';
import { AccountService } from '@app/account/account-service';
import { FailureResponse, FailureStore } from '@bernardo-mg/request';
import { Account, PasswordChange } from '@bernardo-mg/security';
import { DetailField } from '@bernardo-mg/ui';
import { RippleModule } from 'primeng/ripple';
import { finalize } from 'rxjs';

type AccountSection = 'profile' | 'member' | 'password';

@Component({
  imports: [AccountChangePasswordForm, DetailField, RippleModule],
  templateUrl: './account-view.html',
  styleUrl: './account-view.scss'
})
export class AccountView {

  private readonly service = inject(AccountService);

  public account = new Account();

  public accountLoading = false;

  public passwordLoading = false;

  public failures = new FailureStore();

  public activeSection: AccountSection = 'profile';

  public get memberName(): string {
    const name = this.account.profile?.name;

    return name?.fullName
      || [name?.firstName, name?.lastName]
        .filter(Boolean)
        .join(' ');
  }

  constructor() {
    this.accountLoading = true;

    this.service.getAccount()
      .pipe(finalize(() => this.accountLoading = false))
      .subscribe(response => this.account = response);
  }

  public onChangePassword(data: PasswordChange): void {
    this.passwordLoading = true;

    this.service.changePassword(data).subscribe({
      complete: () => this.passwordLoading = false,
      error: error => this.handleError(error)
    });
  }

  public scrollTo(section: AccountSection): void {
    this.activeSection = section;

    const target = document.getElementById(section);
    if (!target) {
      return;
    }

    const headerOffset = 96;
    const top = window.scrollY + target.getBoundingClientRect().top - headerOffset;

    window.scrollTo({
      top,
      behavior: 'smooth'
    });
  }

  private handleError(error: unknown): void {
    this.passwordLoading = false;

    if (error instanceof FailureResponse) {
      this.failures = error.failures;
    } else {
      this.failures.clear();
    }
  }
}