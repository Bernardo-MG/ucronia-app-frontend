import { Injectable, inject } from '@angular/core';
import { SecurityClient } from '@bernardo-mg/security';
import { Account } from 'projects/bernardo-mg/security/src/lib/domain/account';
import { PasswordChange } from 'projects/bernardo-mg/security/src/lib/request/password-change';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class AccountService {

  private readonly securityClient = inject(SecurityClient);

  public getAccount(): Observable<Account> {
    return this.securityClient.account.get();
  }

  public changePassword(data: PasswordChange): Observable<void> {
    return this.securityClient.password.change.change(data);
  }

}
