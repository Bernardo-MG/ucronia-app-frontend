import { Injectable, inject } from '@angular/core';
import { Account, PasswordChange, SecurityClient } from '@bernardo-mg/security';
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
