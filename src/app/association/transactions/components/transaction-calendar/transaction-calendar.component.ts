import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionCalendarRange } from '@app/association/models/transaction-calendar-range';
import { CalendarNote } from '@app/shared/calendar/models/calendar-note';
import { RouteParametersActuator } from '@app/shared/utils/route/actuator/route-parameters-actuator';
import { DateRouteObserver } from '@app/shared/utils/route/date/date-route-observer';
import { RouteParametersObserver } from '@app/shared/utils/route/observer/route-params-observer';
import { TransactionCalendarService } from '../../service/transaction-calendar.service';

@Component({
  selector: 'assoc-transaction-calendar',
  templateUrl: './transaction-calendar.component.html'
})
export class TransactionCalendarComponent implements OnInit {

  /**
   * Loading flag.
   */
  public readingCalendar = false;

  public range = new TransactionCalendarRange();

  public date = new Date();

  private routeActuator: RouteParametersActuator;

  private dateObserver: RouteParametersObserver<Date>;

  public notes: CalendarNote[] = [];

  constructor(
    private service: TransactionCalendarService,
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
        if(!this.readingCalendar){
          this.load(d);
        }
      }
    });
    this.service.getRange().subscribe(d => {
      this.range = d;
      // TODO: What happens if this date is not in the range?
      this.load(new Date());
    });
  }

  public onDateChange(date: Date) {
    this.date = date;
    // Corrects month value
    const month = date.getMonth() + 1;
    const formattedDate = (date.getFullYear() + '-' + month + '-1');
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
    const month = date.getMonth() + 1;
    this.service.getCalendar(date.getFullYear(), month).subscribe({
      next: response => {
        const transactions = response;
        this.notes = transactions.map(t => {
          const date = new Date(t.date);
          return new CalendarNote(date.getFullYear(), date.getMonth(), date.getDate(), t.description);
        });
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
