import { Component, input } from '@angular/core';
import { Account } from '@bernardo-mg/security';
import { DetailField } from '@bernardo-mg/ui';

@Component({
  selector: 'account-info',
  imports: [DetailField],
  templateUrl: './account-info.html'
})
export class AccountInfo {

  public readonly data = input(new Account());

  public readonly loading = input(false);

}