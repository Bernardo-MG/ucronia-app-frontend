
import { Component, inject } from '@angular/core';
import { AccountProfileDetails } from '@app/account/account-profile-details/account-profile-details';
import { AccountService } from '@app/account/account-service';
import { Account } from '@app/account/models/account';
import { Profile } from '@bernardo-mg/security';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { finalize } from 'rxjs';

@Component({
  selector: 'account-profile-view',
  imports: [CardModule, SkeletonModule, AccountProfileDetails],
  templateUrl: './account-profile-view.html'
})
export class AccountProfileView {

  public account = new Account();

  public loading = false;

  public get profile() {
    return this.account.profile as Profile;
  }

  constructor() {
    const service = inject(AccountService);

    this.loading = true;
    service.getAccount()
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.account = response);
  }

}
