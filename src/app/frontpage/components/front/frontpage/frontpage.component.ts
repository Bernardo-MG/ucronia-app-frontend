import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FrontpageService } from '@app/frontpage/services/frontpage.service';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { WaitingOverlayComponent } from '@app/shared/layout/components/waiting-overlay/waiting-overlay.component';
import { TeamupCalendarComponent } from '@app/shared/social/components/teamup-calendar/teamup-calendar.component';
import * as bootstrap from 'bootstrap';
import { FrontpageActivityCalendarWidgetComponent } from '../frontpage-activity-calendar/frontpage-activity-calendar.component';
import { FrontpageContactUsComponent } from '../frontpage-contact-us/frontpage-contact-us.component';
import { PublicLocationWidgetComponent } from '../frontpage-location/frontpage-location.component';

@Component({
  selector: 'app-frontpage-frontpage',
  standalone: true,
  imports: [CommonModule, ArticleComponent, TeamupCalendarComponent, WaitingOverlayComponent, FrontpageActivityCalendarWidgetComponent, PublicLocationWidgetComponent, FrontpageContactUsComponent],
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.sass']
})
export class FrontpageComponent implements OnInit {

  public readingCalendarCode = false;

  public calendarCode = '';

  public locationCode = "";

  public readingLocationCode = false;

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
  }

  public openModal(modalId: string): void {
    const modalElement = document.getElementById(`${modalId}Modal`);
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

}
