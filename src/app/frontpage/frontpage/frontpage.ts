
import { Component, inject, OnInit } from '@angular/core';
import { GoogleMapsComponent } from '@app/shared/social/components/google-maps/google-maps.component';
import { TeamupCalendarComponent } from '@app/shared/social/components/teamup-calendar/teamup-calendar.component';
import { FrontpageService } from '../frontpage-service';

@Component({
  selector: 'app-frontpage-frontpage',
  imports: [TeamupCalendarComponent, GoogleMapsComponent],
  templateUrl: './frontpage.html',
  styleUrls: ['./frontpage.sass']
})
export class Frontpage implements OnInit {

  private service = inject(FrontpageService);

  public calendarCode: string | undefined;

  public locationCode: string | undefined;

  public readonly instagramLink;

  public readonly emailLink;

  constructor() {
    // Instagram URL
    this.instagramLink = this.service.getInstagramUrl();
    // Email URL
    this.emailLink = this.service.getEmailUrl();
  }

  public ngOnInit(): void {
    // Read calendar code
    this.service.getCalendarCode()
      .subscribe(response => this.calendarCode = response);
    // Read location code
    this.service.getMapCode()
      .subscribe(response => this.locationCode = response);
  }

}
