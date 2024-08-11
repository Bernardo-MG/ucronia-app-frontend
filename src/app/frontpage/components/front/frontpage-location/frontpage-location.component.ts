import { Component, Input } from '@angular/core';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { WaitingOverlayComponent } from '@app/shared/layout/components/waiting-overlay/waiting-overlay.component';
import { GoogleMapsComponent } from '@app/shared/social/components/google-maps/google-maps.component';

@Component({
  selector: 'frontpage-location',
  standalone: true,
  imports: [ArticleComponent, GoogleMapsComponent, WaitingOverlayComponent],
  templateUrl: './frontpage-location.component.html'
})
export class PublicLocationWidgetComponent {

  @Input() public locationCode = "";

  @Input() public waiting = false;

}
