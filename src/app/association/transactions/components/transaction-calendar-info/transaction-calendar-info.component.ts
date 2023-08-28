import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from '@app/association/models/transaction';
import { TransactionCalendarRange } from '@app/association/models/transaction-calendar-range';
import { RouteParametersActuator } from '@app/shared/utils/route/actuator/route-parameters-actuator';
import { DateRouteObserver } from '@app/shared/utils/route/date/date-route-observer';
import { RouteParametersObserver } from '@app/shared/utils/route/observer/route-params-observer';
import { TransactionCalendarService } from '../../service/transaction-calendar.service';

@Component({
  selector: 'app-transaction-calendar-info',
  templateUrl: './transaction-calendar-info.component.html'
})
export class TransactionCalendarInfoComponent {

  /**
   * Loading flag.
   */
  public readingCalendar = false;

  public range = new TransactionCalendarRange();

  public year = 0;

  public month = 0;

  private routeActuator: RouteParametersActuator;

  private dateObserver: RouteParametersObserver<Date>;

  public transactions: Transaction[] = [];

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

  public onDateChange(date: Date) {
    // Corrects month value
    const month = date.getMonth() + 1;
    const formattedDate = (date.getFullYear() + '-' + month);
    this.routeActuator.setParameters({ date: formattedDate });
  }

  public onPickDate(date: Date) {
    // Corrects month value
    const month = date.getMonth() + 1;
    const formattedDate = (date.getFullYear() + '-' + month + '-' + date.getDate());
    const parameters = { date: formattedDate };
    this.router.navigate(["/transactions/list"], { queryParams: parameters });
  }

  private load(date: Date) {
    this.readingCalendar = true
    // Corrects month value
    this.year = date.getFullYear();
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
