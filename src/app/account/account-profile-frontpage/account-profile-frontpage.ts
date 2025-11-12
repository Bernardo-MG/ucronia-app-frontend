
import { Component, inject } from '@angular/core';
import { AccountProfileContact } from '@app/account/account-profile-contact/account-profile-contact';
import { Account } from '@app/account/models/account';
import { AccountService } from '@app/account/services/account-service';
import { Contact } from '@app/domain/contact/contact';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { finalize } from 'rxjs';

@Component({
  selector: 'account-profile-frontpage',
  imports: [CardModule, SkeletonModule, AccountProfileContact],
  templateUrl: './account-profile-frontpage.html'
})
export class AccountProfileFrontpage {

  public account = new Account();

  public loading = false;

  public get contact() {
    return this.account.contact as Contact;
  }

  constructor() {
    const service = inject(AccountService);

    this.loading = true;
    service.getAccount()
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.account = response);
  }

}
