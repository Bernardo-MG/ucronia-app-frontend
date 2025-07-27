import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FrontpageService } from '@app/frontpage/services/frontpage.service';
import { GoogleMapsComponent } from '@app/shared/social/components/google-maps/google-maps.component';
import { TeamupCalendarComponent } from '@app/shared/social/components/teamup-calendar/teamup-calendar.component';
import { ArticleComponent } from '@bernardo-mg/ui';

@Component({
    selector: 'app-frontpage-frontpage',
    imports: [CommonModule, ArticleComponent, TeamupCalendarComponent, GoogleMapsComponent],
    templateUrl: './frontpage.container.html',
    styleUrls: ['./frontpage.container.sass']
})
export class FrontpageComponent {
  private service = inject(FrontpageService);


  public calendarCode: string | undefined;

  public locationCode: string | undefined;

  public readonly instagramLink;

  public readonly emailLink;

  constructor() { 
    // Read calendar code
    this.service.getCalendarCode().subscribe({
      next: response => {
        this.calendarCode = response;
      }
    });
    // Read location code
    this.service.getMapCode().subscribe({
      next: response => {
        this.locationCode = response;
      }
    });
    // Instagram URL
    this.instagramLink = this.service.getInstagramUrl();
    // Email URL
    this.emailLink = this.service.getEmailUrl();
  }

}
