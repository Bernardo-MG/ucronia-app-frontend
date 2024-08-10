import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { WaitingOverlayComponent } from '@app/shared/layout/components/waiting-overlay/waiting-overlay.component';
import { TeamupCalendarComponent } from '@app/shared/social/components/teamup-calendar/teamup-calendar.component';
import * as bootstrap from 'bootstrap';
import { PublicActivityCalendarWidgetComponent } from '../../public-activity-calendar-widget/public-activity-calendar-widget.component';
import { PublicContactUsWidgetComponent } from '../../public-contact-us-widget/public-contact-us-widget.component';
import { PublicLocationWidgetComponent } from '../../public-location-widget/public-location-widget.component';

@Component({
  selector: 'app-frontpage-frontpage',
  standalone: true,
  imports: [CommonModule, ArticleComponent, TeamupCalendarComponent, WaitingOverlayComponent, PublicActivityCalendarWidgetComponent, PublicLocationWidgetComponent, PublicContactUsWidgetComponent],
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.sass']
})
export class FrontpageComponent {

  openModal(modalId: string): void {
    const modalElement = document.getElementById(`${modalId}Modal`);
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

}
