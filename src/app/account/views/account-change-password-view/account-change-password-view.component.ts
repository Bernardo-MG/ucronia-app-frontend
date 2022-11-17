import { Component } from '@angular/core';
import { PasswordChange } from '@app/account/models/password-change';
import { AccountService } from '@app/account/services/account.service';

@Component({
  selector: 'account-change-password-view',
  templateUrl: './account-change-password-view.component.html',
  styleUrls: ['./account-change-password-view.component.sass']
})
export class AccountChangePasswordViewComponent {

  constructor(
    private service: AccountService
  ) { }

  public onChangePassword(data: PasswordChange) {
    this.service.changePassword(data).subscribe();
  }

}
