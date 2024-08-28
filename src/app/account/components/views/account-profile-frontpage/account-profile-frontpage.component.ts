import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Account } from '@app/account/models/account';
import { AccountService } from '@app/account/services/account.service';
import { Member } from '@app/association/members/shared/models/member';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { AccountProfileInfoComponent } from '../../profile/account-profile-info/account-profile-info.component';
import { AccountProfileMemberComponent } from '../../profile/account-profile-member/account-profile-member.component';
import { CardModule } from '@app/shared/card/card.module';

@Component({
  selector: 'account-profile-frontpage',
  standalone: true,
  imports: [CommonModule, ArticleComponent, CardModule, AccountProfileInfoComponent, AccountProfileMemberComponent],
  templateUrl: './account-profile-frontpage.component.html'
})
export class AccountProfileFrontpageComponent implements OnInit {

  public account = new Account();

  public get member() {
    return this.account.member as Member;
  }

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.accountService.getAccount().subscribe(u => { this.account = u });
  }

}
