
import { Component, inject } from '@angular/core';
import { AccountProfileProfile } from '@app/account/account-profile-profile/account-profile-profile';
import { Account } from '@app/account/models/account';
import { AccountService } from '@app/account/services/account-service';
import { Profile } from "@ucronia/domain";
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { finalize } from 'rxjs';

@Component({
  selector: 'account-profile-frontpage',
  imports: [CardModule, SkeletonModule, AccountProfileProfile],
  templateUrl: './account-profile-frontpage.html'
})
export class AccountProfileFrontpage {

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
