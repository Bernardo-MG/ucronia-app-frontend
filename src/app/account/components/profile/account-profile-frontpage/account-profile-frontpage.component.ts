import { Component, OnInit } from '@angular/core';
import { Account } from '@app/account/models/account';
import { AccountService } from '@app/account/services/account.service';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { AccountProfileInfoComponent } from '../account-profile-info/account-profile-info.component';

@Component({
  selector: 'account-profile-frontpage',
  standalone: true,
  imports: [ArticleComponent, AccountProfileInfoComponent],
  templateUrl: './account-profile-frontpage.component.html'
})
export class AccountProfileFrontpageComponent implements OnInit {

  public account = new Account();

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.accountService.getAccount().subscribe(u => { this.account = u });
  }

}
