import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from '@app/association/models/transaction';
import { TransactionCalendarRange } from '@app/association/models/transaction-calendar-range';
import { Day } from '@app/shared/calendar/models/day';
import { Month } from '@app/shared/calendar/models/month';
import { RouteParametersActuator } from '@app/shared/utils/route/actuator/route-parameters-actuator';
import { DateRouteObserver } from '@app/shared/utils/route/date/date-route-observer';
import { RouteParametersObserver } from '@app/shared/utils/route/observer/route-params-observer';
import { TransactionCalendarService } from '../../service/transaction-calendar.service';

@Component({
  selector: 'app-transaction-frontpage',
  templateUrl: './transaction-frontpage.component.html'
})
export class TransactionFrontpageComponent {

  /**
   * Loading flag.
   */
  public readingCalendar = false;

  public range = new TransactionCalendarRange();

  public year = 0;

  public month = 0;

  public transactions: Transaction[] = [];

  private routeActuator: RouteParametersActuator;

  private dateObserver: RouteParametersObserver<Date>;

  constructor(
    private service: TransactionCalendarService,
    private router: Router,
    route: ActivatedRoute
  ) {
    this.routeActuator = new RouteParametersActuator(router);
    this.dateObserver = new DateRouteObserver(route);
  }

  ngOnInit(): void {
    // Watch for changes in selected date
    this.dateObserver.subject.subscribe(d => {
      if (d) {
        if (!this.readingCalendar) {
          this.load(d);
        }
      }
    });
    // Read range
    this.service.getRange().subscribe(d => {
      this.range = d;
      // TODO: What happens if this date is not in the range?
      this.load(new Date());
    });
  }

  public onDateChange(date: Month) {
    // Corrects month value
    const formattedDate = (date.year + '-' + date.month);
    this.routeActuator.setParameters({ date: formattedDate });
  }

  public onPickDate(date: Day) {
    // Corrects month value
    const formattedDate = (date.year + '-' + date.month + '-' + date.day);
    const parameters = { date: formattedDate };
    this.router.navigate(["/transactions/list"], { queryParams: parameters });
  }

  private load(date: Date) {
    this.readingCalendar = true
    this.year = date.getFullYear();
    // Corrects month value
    this.month = date.getMonth() + 1;
    this.service.getCalendar(this.year, this.month).subscribe({
      next: response => {
        this.transactions = response;
        // Reactivate view
        this.readingCalendar = false;
      },
      error: error => {
        // Reactivate view
        this.readingCalendar = false;
      }
    });
  }

}
