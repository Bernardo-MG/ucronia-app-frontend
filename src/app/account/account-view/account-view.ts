import { Component, inject } from '@angular/core';
import { AccountChangePasswordForm } from '@app/account/account-change-password-form/account-change-password-form';
import { AccountService } from '@app/account/account-service';
import { FailureResponse, FailureStore } from '@bernardo-mg/request';
import { Account, PasswordChange } from '@bernardo-mg/security';
import { DetailField } from '@bernardo-mg/ui';
import { Profile } from '@ucronia/domain';
import { RippleModule } from 'primeng/ripple';
import { finalize, switchMap, tap } from 'rxjs';

type AccountSection = 'profile' | 'member' | 'password';

@Component({
  imports: [AccountChangePasswordForm, DetailField, RippleModule],
  templateUrl: './account-view.html',
  styleUrl: './account-view.scss'
})
export class AccountView {

  private readonly service = inject(AccountService);

  public account = new Account();

  public profile?: Profile;

  public accountLoading = false;

  public passwordLoading = false;

  public failures = new FailureStore();

  public activeSection: AccountSection = 'profile';

  public get memberName(): string {
    const name = this.profile?.name;

    if (!name) {
      return '';
    }

    return name.fullName
      || [name.firstName, name.lastName]
        .filter(Boolean)
        .join(' ');
  }

  constructor() {
    this.loadAccount();
  }

  public onChangePassword(data: PasswordChange): void {
    this.passwordLoading = true;
    this.failures.clear();

    this.service.changePassword(data)
      .pipe(finalize(() => this.passwordLoading = false))
      .subscribe({
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

  private loadAccount(): void {
    this.accountLoading = true;
    this.profile = undefined;

    this.service.getAccount()
      .pipe(
        tap(account => this.account = account),
        switchMap(account => this.service.getProfile(account.username)),
        finalize(() => this.accountLoading = false)
      )
      .subscribe(profile => this.profile = profile);
  }

  private handleError(error: unknown): void {
    if (error instanceof FailureResponse) {
      this.failures = error.failures;
    } else {
      this.failures.clear();
    }
  }
}