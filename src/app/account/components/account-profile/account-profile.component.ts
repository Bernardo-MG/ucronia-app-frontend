import { Component } from '@angular/core';
import { Account } from '@app/account/models/account';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'account-profile',
  templateUrl: './account-profile.component.html'
})
export class AccountProfileViewComponent {

  public account = new Account();

  constructor(
    private accountService: AccountService
  ) {
    this.accountService.getAccount().subscribe(u => { this.account = u });
  }

}
