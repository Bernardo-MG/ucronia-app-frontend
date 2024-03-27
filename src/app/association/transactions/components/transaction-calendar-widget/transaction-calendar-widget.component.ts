import { Component, OnInit } from '@angular/core';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { IconsModule } from '@app/shared/icons/icons.module';
import { TransactionCalendarComponent } from '../transaction-calendar/transaction-calendar.component';

@Component({
  selector: 'assoc-transaction-calendar-widget',
  standalone: true,
  imports: [TransactionCalendarComponent, IconsModule],
  templateUrl: './transaction-calendar-widget.component.html'
})
export class TransactionCalendarWidgetComponent implements OnInit {

  public createPermission = false;

  constructor(
    private authContainer: AuthContainer
  ) { }

  public ngOnInit(): void {
    // Check permissions
    this.createPermission = this.authContainer.hasPermission("transaction", "create");
  }

}
