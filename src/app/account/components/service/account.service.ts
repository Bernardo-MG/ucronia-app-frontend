import { Injectable } from '@angular/core';
import { Account } from '@app/account/models/account';
import { AuthService } from '@app/core/authentication/services/auth.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private authService: AuthService
  ) { }

  public getAccount(): Observable<Account> {
    return this.authService.getStatus().pipe(map(s => {
      const account = new Account();

      account.username = s.username;
      account.email = '';

      return account;
    }));
  }

}
