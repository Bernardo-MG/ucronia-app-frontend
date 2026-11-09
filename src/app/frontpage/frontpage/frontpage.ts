
import { Component, inject, OnInit } from '@angular/core';
import { GoogleMaps, TeamupCalendar } from '@bernardo-mg/ui';
import { Activity, PublicSettings } from '@ucronia/domain';
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

  private readonly service = inject(FrontpageService);
  public activities: Activity[] = [];

  public readonly calendarCode: string | undefined;
  public loadingActivities = false;
  public readonly locationCode: string | undefined;
  public selectedActivityDisplay: ActivityDisplay = 'upcoming';
  public settings = new PublicSettings();

  public ngOnInit(): void {
    this.service.getSettings()
      .subscribe(settings => this.settings = settings);

    this.loadActivities('upcoming');
  }

  public loadActivities(display: ActivityDisplay): void {
    const now = new Date();
    const from = display === 'upcoming' ? now : undefined;
    const to = display === 'past' ? now : undefined;

    this.selectedActivityDisplay = display;
    this.loadingActivities = true;
    this.service.getActivities(from, to)
      .pipe(finalize(() => this.loadingActivities = false))
      .subscribe(activities => this.activities = activities);
  }

}
