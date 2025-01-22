import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AccountProfileInfoComponent } from '@app/account/components/profile/account-profile-info/account-profile-info.component';
import { AccountProfilePersonComponent } from '@app/account/components/profile/account-profile-person/account-profile-person.component';
import { Account } from '@app/account/models/account';
import { AccountService } from '@app/account/services/account.service';
import { Person } from '@app/models/person/person';
import { CardBodyComponent } from '@app/shared/card/components/card-body/card-body.component';
import { CardComponent } from '@app/shared/card/components/card/card.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';

@Component({
    selector: 'account-profile-frontpage',
    imports: [CommonModule, ArticleComponent, AccountProfileInfoComponent, AccountProfilePersonComponent, ResponsiveShortColumnsDirective, CardComponent, CardBodyComponent],
    templateUrl: './account-profile-frontpage.container.html'
})
export class AccountProfileFrontpageContainer implements OnInit {

  public account = new Account();

  public waiting = false;

  public get person() {
    return this.account.person as Person;
  }

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.waiting = true;
    this.accountService.getAccount().subscribe({
      next: response => {
        this.account = response;
        this.waiting = false;
      },
      error: error => {
        this.waiting = false;
      }
    });
  }

}
