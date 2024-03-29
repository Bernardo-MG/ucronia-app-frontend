import { Component } from '@angular/core';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { AccessUserSelectionListWidgetComponent } from '../access-user-selection-list-widget/access-user-selection-list-widget.component';

@Component({
  selector: 'access-user-frontpage',
  standalone: true,
  imports: [AccessUserSelectionListWidgetComponent, ArticleComponent],
  templateUrl: './access-user-frontpage.component.html'
})
export class AccessFrontpageComponent {

}
