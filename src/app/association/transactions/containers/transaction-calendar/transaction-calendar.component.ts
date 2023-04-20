import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionCalendarRange } from '@app/association/models/transaction-calendar-range';
import { CalendarNote } from '@app/shared/calendar/models/calendar-note';
import { RouteParametersActuator } from '@app/shared/utils/route/actuator/route-parameters-actuator';
import { DateRouteObserver } from '@app/shared/utils/route/date/date-route-observer';
import { RouteParametersObserver } from '@app/shared/utils/route/observer/route-params-observer';
import { TransactionFilter } from '../../models/transaction-filter';
import { TransactionService } from '../../service/transaction.service';

@Component({
  selector: 'assoc-transaction-calendar',
  templateUrl: './transaction-calendar.component.html'
})
export class TransactionCalendarComponent implements OnInit {

  /**
   * Loading flag.
   */
  public waiting = false;

  public range = new TransactionCalendarRange();

  public date = new Date();

  private routeActuator: RouteParametersActuator;

  private dateObserver: RouteParametersObserver<Date>;

  public notes: CalendarNote[] = [];

  constructor(
    private service: TransactionService,
    private router: Router,
    route: ActivatedRoute
  ) {
    this.routeActuator = new RouteParametersActuator(router);
    this.dateObserver = new DateRouteObserver(route);
  }

  ngOnInit(): void {
    this.dateObserver.subject.subscribe(d => {
      if (d) {
        this.date = d;
        this.load(d);
      }
    });
    this.service.getRange().subscribe(d => {
      this.range = d;
      this.load(new Date());
    });
  }

  public onDateChange(date: Date) {
    this.date = date;
    const formattedDate = (date.getFullYear() + '-' + (date.getMonth() + 1) + '-1');
    this.routeActuator.setParameters({ date: formattedDate });
  }

  public onPickDate(date: Date) {
    const formattedDate = (date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());
    const parameters = { date: formattedDate };
    this.router.navigate(["/transactions/list"], { queryParams: parameters });
  }

  private load(date: Date) {
    const filter = new TransactionFilter();

    const month = date.getMonth() + 1;
    const firstDay = 1;
    const lastDay = new Date(date.getFullYear(), month, 0).getDate();

    const startDate = (date.getFullYear() + '-' + month + '-' + firstDay);
    const endDate = (date.getFullYear() + '-' + month + '-' + lastDay);

    filter.startDate = startDate;
    filter.endDate = endDate;

    this.waiting = true
    this.service.getAll(undefined, filter).subscribe({
      next: page => {
        const transactions = page.content;
        this.notes = transactions.map(t => {
          const date = new Date(t.date);
          return new CalendarNote(date.getFullYear(), date.getMonth(), date.getDate(), t.description);
        });
        // Reactivate view
        this.waiting = false;
      },
      error: error => {
        // Reactivate view
        this.waiting = false;
      }
    });
  }

}
