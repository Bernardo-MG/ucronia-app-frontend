
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GoogleMaps, TeamupCalendar } from '@bernardo-mg/ui';
import { Activity, ContactInfo } from '@ucronia/domain';
import { finalize } from 'rxjs';
import { ActivityCarousel, ActivityDisplay } from '../activity-carousel/activity-carousel';
import { FrontpageService } from '../frontpage-service';

@Component({
  selector: 'app-frontpage-frontpage',
  imports: [TeamupCalendar, GoogleMaps, ActivityCarousel],
  templateUrl: './frontpage.html',
  styleUrls: ['./frontpage.sass']
})
export class Frontpage implements OnInit {

  private readonly destroyRef = inject(DestroyRef);
  private readonly service = inject(FrontpageService);

  public activities: Activity[] = [];
  public readonly calendarCode: string | undefined;
  public loadingActivities = false;
  public readonly locationCode: string | undefined;
  public selectedActivityDisplay: ActivityDisplay = 'upcoming';
  public contactInfo = new ContactInfo();

  // Lifecycle hooks
  public ngOnInit(): void {
    this.service.getContactInfo()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(contactInfo => this.contactInfo = contactInfo);

    this.loadActivities('upcoming');
  }

  // Event handlers
  public loadActivities(display: ActivityDisplay): void {
    const now = new Date();
    const from = display === 'upcoming' ? now : undefined;
    const to = display === 'past' ? now : undefined;

    this.selectedActivityDisplay = display;
    this.loadingActivities = true;
    this.service.getActivities(from, to)
      .pipe(
        finalize(() => this.loadingActivities = false),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(activities => this.activities = activities);
  }

}
