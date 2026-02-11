
import { Component, inject, OnInit } from '@angular/core';
import { GoogleMaps, TeamupCalendar } from '@bernardo-mg/ui';
import { FrontpageService } from '../frontpage-service';

@Component({
  selector: 'app-frontpage-frontpage',
  imports: [TeamupCalendar, GoogleMaps],
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
    this.service.getCalendar()
      .subscribe(response => this.calendarCode = response);
    // Read location code
    this.service.getMap()
      .subscribe(response => this.locationCode = response);
  }

}
