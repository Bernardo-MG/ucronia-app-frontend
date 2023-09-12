import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeeCalendarRange } from '@app/association/models/fee-calendar-range';
import { UserFeeCalendar } from '@app/association/models/user-fee-calendar';
import { RouteParametersActuator } from '@app/shared/utils/route/actuator/route-parameters-actuator';
import { RouteParametersObserver } from '@app/shared/utils/route/observer/route-params-observer';
import { YearRouteObserver } from '../../observer/year-route-observer';
import { FeeCalendarService } from '../../services/fee-calendar.service';
import { AuthService } from '@app/core/authentication/services/auth.service';


@Component({
  selector: 'assoc-fee-frontpage',
  templateUrl: './fee-frontpage.component.html'
})
export class FeeFrontpageComponent implements OnInit {

  /**
   * Loading flag. Shows the loading visual cue.
   */
  public readingCalendar = false;

  public createPermission = false;

  public range = new FeeCalendarRange();

  public onlyActive = true;

  public rows: UserFeeCalendar[] = [];

  public year = new Date().getFullYear();

  private routeActuator;

  private routeObserver;

  constructor(
    router: Router,
    route: ActivatedRoute,
    private service: FeeCalendarService,
    private authService: AuthService
  ) {
    this.routeActuator = new RouteParametersActuator(router);
    this.routeObserver = new YearRouteObserver(route);
  }

  ngOnInit(): void {
    // Check permissions
    this.createPermission = this.authService.hasPermission("fee", "create");

    // Load range
    this.service.getRange().subscribe(d => this.range = d);

    // Watch for year changes
    this.routeObserver.subject.subscribe(y => {
      if (y) {
        this.load(y);
      } else {
        // Load initial year
        this.load(new Date().getFullYear());
      }
    });
  }

  public onFilterActiveMembers(event: any) {
    this.onlyActive = event.checked;
    this.load(this.year);
  }

  public onYearChange(year: number) {
    this.year = year;
    this.load(year);
  }

  private load(year: number) {
    this.year = year;
    this.readingCalendar = true;
    this.routeActuator.addParameters({ year });

    this.service.getCalendar(year, this.onlyActive).subscribe({
      next: data => {
        this.rows = data;
        this.readingCalendar = false;
      },
      error: error => {
        // Reactivate view
        this.readingCalendar = false;
      }
    });
  }

}
