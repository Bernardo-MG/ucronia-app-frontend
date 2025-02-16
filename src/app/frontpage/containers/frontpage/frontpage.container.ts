import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FrontpageService } from '@app/frontpage/services/frontpage.service';
import { GoogleMapsComponent } from '@app/shared/social/components/google-maps/google-maps.component';
import { TeamupCalendarComponent } from '@app/shared/social/components/teamup-calendar/teamup-calendar.component';
import { ArticleComponent } from '@bernardo-mg/layout';

@Component({
    selector: 'app-frontpage-frontpage',
    imports: [CommonModule, ArticleComponent, TeamupCalendarComponent, GoogleMapsComponent],
    templateUrl: './frontpage.container.html',
    styleUrls: ['./frontpage.container.sass']
})
export class FrontpageComponent implements OnInit {

  public calendarCode: string | undefined;

  public locationCode: string | undefined;

  public instagramLink = "";

  public emailLink = "";

  constructor(
    private service: FrontpageService
  ) { }

  ngOnInit(): void {
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
