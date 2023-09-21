import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeeCalendarRange } from '@app/association/models/fee-calendar-range';
import { FeeMonth } from '@app/association/models/fee-month';
import { UserFeeCalendar } from '@app/association/models/user-fee-calendar';
import { RouteParametersActuator } from '@app/shared/utils/route/actuator/route-parameters-actuator';
import { YearRouteObserver } from '../../observer/year-route-observer';
import { FeeCalendarService } from '../../services/fee-calendar.service';

@Component({
  selector: 'assoc-fee-calendar',
  templateUrl: './fee-calendar.component.html'
})
export class FeeCalendarComponent implements OnInit, OnChanges {

  @Input() public onlyActive = true;

  public year = new Date().getFullYear();

  /**
   * Loading flag. Shows the loading visual cue.
   */
  public readingCalendar = false;

  public rows: UserFeeCalendar[] = [];

  public range = new FeeCalendarRange();

  private index = 0;

  public months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  private routeActuator;

  private routeObserver;

  constructor(
    router: Router,
    route: ActivatedRoute,
    private service: FeeCalendarService
  ) {
    this.routeActuator = new RouteParametersActuator(router);
    this.routeObserver = new YearRouteObserver(route);
  }

  public ngOnInit(): void {
    // Load range
    this.service.getRange().subscribe(d => {
      this.range = d;
      const lastYear = this.range.years[this.range.years.length - 1];
      if (this.year > lastYear) {
        this.year = lastYear;
      }
      this.index = this.range.years.indexOf(this.year);
    });

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

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['onlyActive']) {
      this.load(this.year);
    }
  }

  public onGoTo(event: any) {
    this.year = Number(event.target.value);
    this.load(this.year);
  }

  public onGoPrevious() {
    this.index = this.index - 1;
    this.year = this.range.years[this.index];
    this.load(this.year);
  }

  public onGoNext() {
    this.index = this.index + 1;
    this.year = this.range.years[this.index];
    this.load(this.year);
  }

  public isAbleToGoNext() {
    return ((this.index >= 0) && ((this.index + 1) < this.range.years.length));
  }

  public isAbleToGoPrevious() {
    return (this.index > 0);
  }

  public hasMonth(months: FeeMonth[], month: number): boolean {
    return months.find(m => m.month === month) !== undefined;
  }

  public getMonth(months: FeeMonth[], month: number): FeeMonth | undefined {
    return months.find(m => m.month === month);
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
