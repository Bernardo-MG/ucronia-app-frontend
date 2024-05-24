import { Component } from '@angular/core';
import { FrontpageService } from '@app/frontpage/services/frontpage.service';
import { WaitingOverlayComponent } from '@app/shared/layout/components/waiting-overlay/waiting-overlay.component';
import { GoogleMapsComponent } from '@app/shared/social/components/google-maps/google-maps.component';

@Component({
  selector: 'app-public-location-widget',
  standalone: true,
  imports: [GoogleMapsComponent, WaitingOverlayComponent],
  templateUrl: './public-location-widget.component.html'
})
export class PublicLocationWidgetComponent {

  public locationCode = "";

  public readingLocationId = false;

  constructor(
    private service: FrontpageService
  ) { }

  ngOnInit(): void {
    this.readingLocationId = true;
    this.service.getLocationCode().subscribe({
      next: response => {
        this.locationCode = response;
        this.readingLocationId = false;
      },
      error: error => {
        this.readingLocationId = false;
      }
    });
  }

}
