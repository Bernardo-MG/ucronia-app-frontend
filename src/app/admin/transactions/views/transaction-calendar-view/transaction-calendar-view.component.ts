import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarNote } from '@app/calendar/models/calendar-note';
import { Transaction } from '@app/models/transaction';
import { RouteParametersActuator } from '@app/route/actuator/route-parameters-actuator';
import { DateParametersParser } from '@app/route/date/date-parameters-parser';
import { RouteParametersObserver } from '@app/route/observer/route-params-observer';
import { TransactionFilter } from '../../service/model/transaction-filter';
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

  private routeObserver: RouteParametersObserver<Date>;

  public notes: CalendarNote[] = [];

  constructor(
    private service: TransactionService,
    private router: Router,
    route: ActivatedRoute
  ) {
    this.routeActuator = new RouteParametersActuator(router);
    this.routeObserver = new RouteParametersObserver(route, new DateParametersParser());
  }

  ngOnInit(): void {
    this.routeObserver.subject.subscribe(d => {
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
