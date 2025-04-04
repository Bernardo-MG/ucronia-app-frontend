import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AccountProfileInfoComponent } from '@app/account/components/profile/account-profile-info/account-profile-info.component';
import { AccountProfilePersonComponent } from '@app/account/components/profile/account-profile-person/account-profile-person.component';
import { Account } from '@app/account/models/account';
import { AccountService } from '@app/account/services/account.service';
import { Person } from '@app/models/person/person';
import { ArticleComponent, CardBodyComponent, CardComponent, ResponsiveShortColumnsDirective } from '@bernardo-mg/layout';

@Component({
    selector: 'account-profile-frontpage',
    imports: [CommonModule, ArticleComponent, AccountProfileInfoComponent, AccountProfilePersonComponent, ResponsiveShortColumnsDirective, CardComponent, CardBodyComponent],
    templateUrl: './account-profile-frontpage.container.html'
})
export class AccountProfileFrontpageContainer {

  public account = new Account();

  public waiting = false;

  public get person() {
    return this.account.person as Person;
  }

  constructor(
    service: AccountService
  ) {
    this.waiting = true;
    service.getAccount().subscribe({
      next: response => {
        this.account = response;
        this.waiting = false;
      },
      error: error => {
        this.waiting = false;
      }
    });
  }

}
