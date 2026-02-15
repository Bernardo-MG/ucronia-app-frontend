
import { Component, inject, OnInit } from '@angular/core';
import { GoogleMaps, TeamupCalendar } from '@bernardo-mg/ui';
import { PublicSettings } from '@ucronia/domain';
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
  public settings = new PublicSettings();

  public ngOnInit(): void {
    this.service.getSettings()
      .subscribe(settings => this.settings = settings);
  }

}
