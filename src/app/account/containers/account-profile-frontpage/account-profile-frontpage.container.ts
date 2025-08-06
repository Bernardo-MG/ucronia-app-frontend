
import { Component, inject } from '@angular/core';
import { AccountProfilePersonComponent } from '@app/account/components/account-profile-person/account-profile-person.component';
import { Account } from '@app/account/models/account';
import { AccountService } from '@app/account/services/account.service';
import { Person } from '@app/models/person/person';
import { ResponsiveShortColumnsDirective } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'account-profile-frontpage',
  imports: [CardModule, SkeletonModule, AccountProfilePersonComponent, ResponsiveShortColumnsDirective],
  templateUrl: './account-profile-frontpage.container.html'
})
export class AccountProfileFrontpageContainer {

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
