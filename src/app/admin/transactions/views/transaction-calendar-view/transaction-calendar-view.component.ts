import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarNote } from '@app/calendar/models/calendar-note';
import { RouteParametersActuator } from '@app/route/actuator/route-parameters-actuator';
import { DateRouteObserver } from '@app/route/date/date-route-observer';
import { RouteParametersObserver } from '@app/route/observer/route-params-observer';
import { TransactionFilter } from '../../models/transaction-filter';
import { TransactionService } from '../../service/transaction.service';

@Component({
  selector: 'admin-transaction-calendar-view',
  templateUrl: './transaction-calendar-view.component.html',
  styleUrls: ['./transaction-calendar-view.component.sass']
})
export class TransactionCalendarViewComponent implements OnInit {

  /**
   * Loading flag.
   */
  public loading = false;

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

  public isLoading(): boolean {
    return this.loading;
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

    this.loading = true
    this.service.getAll(undefined, filter).subscribe({
      next: page => {
        const transactions = page.content;
        this.notes = transactions.map(t => {
          const date = new Date(t.date);
          return new CalendarNote(date.getFullYear(), date.getMonth(), date.getDate(), t.description);
        });
        // Reactivate view
        this.loading = false;
      },
      error: error => {
        // Reactivate view
        this.loading = false;
      }
    });
  }

}
