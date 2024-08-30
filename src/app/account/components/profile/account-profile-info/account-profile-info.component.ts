import { Component, Input } from '@angular/core';
import { Account } from '@app/account/models/account';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { PlaceholderDirective } from '@app/shared/layout/directives/placeholder.directive';

@Component({
  selector: 'account-profile-info',
  standalone: true,
  imports: [ArticleComponent, PlaceholderDirective],
  templateUrl: './account-profile-info.component.html'
})
export class AccountProfileInfoComponent {

  @Input() public account = new Account();

  @Input() public waiting = false;

}
