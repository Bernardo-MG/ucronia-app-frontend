import { Injectable, inject } from '@angular/core';
import { Account, PasswordChange, SecurityClient } from '@bernardo-mg/security';
import { UcroniaClient } from '@ucronia/api';
import { Profile } from '@ucronia/domain';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly securityClient = inject(SecurityClient);
  private readonly ucroniaClient = inject(UcroniaClient);

  public getAccount(): Observable<Account> {
    return this.securityClient.account.get();
  }

  public getProfile(): Observable<Profile | undefined> {
    return this.ucroniaClient.account.profile.get();
  }

  public changePassword(data: PasswordChange): Observable<void> {
    return this.securityClient.password.change.change(data);
  }

}