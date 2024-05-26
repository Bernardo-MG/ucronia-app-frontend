import { Component } from '@angular/core';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { MyFeesListWidgetComponent } from '../../widgets/my-fees-list-widget/my-fees-list-widget.component';

@Component({
  selector: 'app-my-fees-frontpage',
  standalone: true,
  imports: [ArticleComponent, MyFeesListWidgetComponent],
  templateUrl: './my-fees-frontpage.component.html'
})
export class MyFeesFrontpageComponent {

}
