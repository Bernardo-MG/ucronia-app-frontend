import { Component, Input } from '@angular/core';
import { Account } from '@app/account/models/account';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';

@Component({
  selector: 'account-profile-info',
  standalone: true,
  imports: [ArticleComponent],
  templateUrl: './account-profile-info.component.html'
})
export class AccountProfileInfoComponent {

  @Input() public account = new Account();

}
