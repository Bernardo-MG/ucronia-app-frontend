import { Injectable, inject } from '@angular/core';
import { Account, PasswordChange, SecurityClient } from '@bernardo-mg/security';
import { Profile } from '@ucronia/domain';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly securityClient = inject(SecurityClient);

  public getAccount(): Observable<Account> {
    return this.securityClient.account.get();
  }

  public getProfile(username: string): Observable<Profile | undefined> {
    return this.securityClient.user.profile.get(username);
  }

  public changePassword(data: PasswordChange): Observable<void> {
    return this.securityClient.password.change.change(data);
  }

}