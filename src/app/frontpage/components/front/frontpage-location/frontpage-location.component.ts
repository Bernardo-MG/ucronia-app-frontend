import { Component, Input } from '@angular/core';
import { WaitingOverlayComponent } from '@app/shared/layout/components/waiting-overlay/waiting-overlay.component';
import { GoogleMapsComponent } from '@app/shared/social/components/google-maps/google-maps.component';

@Component({
  selector: 'frontpage-location',
  standalone: true,
  imports: [GoogleMapsComponent, WaitingOverlayComponent],
  templateUrl: './frontpage-location.component.html'
})
export class PublicLocationWidgetComponent {

  @Input() public locationCode = "";

  @Input() public waiting = false;

}
