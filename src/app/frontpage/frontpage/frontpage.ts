
import { Component, inject, OnInit } from '@angular/core';
import { ActivityCarousel } from '@app/frontpage/activity-carousel/activity-carousel';
import { Page } from '@bernardo-mg/request';
import { GoogleMaps, TeamupCalendar } from '@bernardo-mg/ui';
import { Activity, PublicSettings } from '@ucronia/domain';
import { finalize } from 'rxjs';
import { FrontpageService } from '../frontpage-service';

@Component({
  selector: 'app-frontpage-frontpage',
  imports: [TeamupCalendar, GoogleMaps, ActivityCarousel],
  templateUrl: './frontpage.html',
  styleUrls: ['./frontpage.sass']
})
export class Frontpage implements OnInit {

  private service = inject(FrontpageService);

  public calendarCode: string | undefined;
  public locationCode: string | undefined;
  public settings = new PublicSettings();

  public activities = new Page<Activity>();
  public loadingActivities = false;

  public ngOnInit(): void {
    this.service.getSettings()
      .subscribe(settings => this.settings = settings);

    this.loadingActivities = true;
    this.service.getActivities()
      .pipe(finalize(() => this.loadingActivities = false))
      .subscribe(activities => this.activities = activities);
  }

}
