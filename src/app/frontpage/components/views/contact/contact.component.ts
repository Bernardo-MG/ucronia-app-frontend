import { Component } from '@angular/core';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { PublicLocationWidgetComponent } from '../../public-location-widget/public-location-widget.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ArticleComponent, PublicLocationWidgetComponent],
  templateUrl: './contact.component.html'
})
export class ContactComponent {

}
