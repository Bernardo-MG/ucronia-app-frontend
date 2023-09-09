import { Component, OnInit } from '@angular/core';
import { FeeCalendarRange } from '@app/association/models/fee-calendar-range';
import { FeeCalendarRow } from '@app/association/models/fee-calendar-row';
import { FeeCalendarService } from '../../services/fee-calendar.service';
import { RouteApiActuator } from '@app/shared/utils/api/route/actuator/route-api-actuator';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteParametersActuator } from '@app/shared/utils/route/actuator/route-parameters-actuator';
import { RouteParametersObserver } from '@app/shared/utils/route/observer/route-params-observer';
import { YearRouteObserver } from '../../observer/year-route-observer';


@Component({
  selector: 'assoc-fee-calendar-info',
  templateUrl: './fee-calendar-info.component.html'
})
export class FeeCalendarInfoComponent implements OnInit {

  /**
   * Loading flag. Shows the loading visual cue.
   */
  public readingCalendar = false;

  public range = new FeeCalendarRange();

  public onlyActive = true;

  public rows: FeeCalendarRow[] = [];

  public year = new Date().getFullYear();

  private routeActuator: RouteParametersActuator;

  private routeObserver: RouteParametersObserver<number>;

  constructor(
    router: Router,
    route: ActivatedRoute,
    private service: FeeCalendarService
  ) {
    this.routeActuator = new RouteParametersActuator(router);
    this.routeObserver = new YearRouteObserver(route);
  }

  ngOnInit(): void {
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
