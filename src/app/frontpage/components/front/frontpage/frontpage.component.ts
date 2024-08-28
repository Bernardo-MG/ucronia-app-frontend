import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FrontpageService } from '@app/frontpage/services/frontpage.service';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { BlockUiDirective } from '@app/shared/layout/directives/block-ui.directive';
import { GoogleMapsComponent } from '@app/shared/social/components/google-maps/google-maps.component';
import { TeamupCalendarComponent } from '@app/shared/social/components/teamup-calendar/teamup-calendar.component';
import { FrontpageCalendarComponent } from '../frontpage-calendar/frontpage-calendar.component';

@Component({
  selector: 'app-frontpage-frontpage',
  standalone: true,
  imports: [CommonModule, ArticleComponent, TeamupCalendarComponent, FrontpageCalendarComponent, GoogleMapsComponent, BlockUiDirective],
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.sass']
})
export class FrontpageComponent implements OnInit {

  public readingCalendarCode = false;

  public calendarCode = '';

  public locationCode = "";

  public readingLocationCode = false;

  public instagramLink = "";

  public emailLink = "";

  constructor(
    private service: FrontpageService
  ) { }

  ngOnInit(): void {
    // Read calendar code
    this.readingCalendarCode = true;
    this.service.getCalendarCode().subscribe({
      next: response => {
        this.calendarCode = response;
        this.readingCalendarCode = false;
      },
      error: error => {
        this.readingCalendarCode = false;
      }
    });
    // Read location code
    this.readingLocationCode = true;
    this.service.getMapCode().subscribe({
      next: response => {
        this.locationCode = response;
        this.readingLocationCode = false;
      },
      error: error => {
        this.readingLocationCode = false;
      }
    });
    // Instagram URL
    this.instagramLink = this.service.getInstagramUrl();
    // Email URL
    this.emailLink = this.service.getEmailUrl();
  }

}
