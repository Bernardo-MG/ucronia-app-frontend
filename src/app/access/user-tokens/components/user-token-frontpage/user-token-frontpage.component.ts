import { Component } from '@angular/core';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { UserTokenSelectionListComponent } from '../user-token-selection-list/user-token-selection-list.component';

@Component({
  selector: 'access-user-token-frontpage',
  standalone: true,
  imports: [UserTokenSelectionListComponent, ArticleComponent],
  templateUrl: './user-token-frontpage.component.html'
})
export class UserTokenFrontpageComponent {

}
