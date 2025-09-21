
import { Component, inject } from '@angular/core';
import { AccountProfilePerson } from '@app/account/account-profile-person/account-profile-person';
import { Account } from '@app/account/models/account';
import { AccountService } from '@app/account/services/account-service';
import { Person } from '@app/domain/person/person';
import { ResponsiveShortColumnsDirective } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'account-profile-frontpage',
  imports: [CardModule, SkeletonModule, AccountProfilePerson, ResponsiveShortColumnsDirective],
  templateUrl: './account-profile-frontpage.html'
})
export class AccountProfileFrontpage {

  public account = new Account();

  public loading = false;

  public get person() {
    return this.account.person as Person;
  }

  constructor() {
    const service = inject(AccountService);

    this.loading = true;
    service.getAccount().subscribe({
      next: response => {
        this.account = response;
        this.loading = false;
      },
      error: error => {
        this.loading = false;
      }
    });
  }

}
