import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from '@app/association/models/transaction';
import { AuthService } from '@app/core/authentication/services/auth.service';
import { Month } from '@app/shared/calendar/models/month';
import { RouteParametersActuator } from '@app/shared/utils/route/actuator/route-parameters-actuator';
import { DateRouteObserver } from '@app/shared/utils/route/date/date-route-observer';
import { RouteParametersObserver } from '@app/shared/utils/route/observer/route-params-observer';
import { TransactionCalendarService } from '../../service/transaction-calendar.service';

@Component({
  selector: 'app-transaction-frontpage',
  templateUrl: './funds-frontpage.component.html'
})
export class FundsFrontpageComponent {

  /**
   * Loading flag.
   */
  public readingCalendar = false;

  public createPermission = false;

  public year = 0;

  public month = 0;

  public months: Date[] = [];

  public transactions: Transaction[] = [];

  private routeActuator: RouteParametersActuator;

  private dateObserver: RouteParametersObserver<Date>;

  constructor(
    private service: TransactionCalendarService,
    private router: Router,
    route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.routeActuator = new RouteParametersActuator(router);
    this.dateObserver = new DateRouteObserver(route);
  }

  ngOnInit(): void {
    // Check permissions
    this.createPermission = this.authService.hasPermission("transaction", "create");

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
      this.months = d;
      // TODO: What happens if this date is not in the range?
      if ((!this.readingCalendar) && (this.year === 0)) {
        this.load(new Date());
      }
    });
  }

  public onDateChange(date: Month) {
    // Corrects month value
    const formattedDate = (date.year + '-' + date.month);
    this.routeActuator.setParameters({ date: formattedDate });
  }

  public onPickTransaction(transaction: number) {
    this.router.navigate([`/funds/${transaction}`]);
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
