import { Component } from '@angular/core';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { UserFeeListWidgetComponent } from '../../widgets/user-fee-list-widget/user-fee-list-widget.component';

@Component({
  selector: 'app-user-fee-frontpage',
  standalone: true,
  imports: [ArticleComponent, UserFeeListWidgetComponent],
  templateUrl: './user-fee-frontpage.component.html'
})
export class UserFeeFrontpageComponent {

}
