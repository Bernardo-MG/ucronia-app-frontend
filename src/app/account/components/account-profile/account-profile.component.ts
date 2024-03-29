import { Component } from '@angular/core';
import { Account } from '@app/account/models/account';
import { AccountService } from '@app/account/services/account.service';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';

@Component({
  selector: 'account-profile',
  standalone: true,
  imports: [ArticleComponent],
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
