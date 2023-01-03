import { Component } from '@angular/core';
import { Transaction } from '@app/models/transaction';
import { TransactionService } from '../../service/transaction.service';

@Component({
  selector: 'admin-transaction-calendar-view',
  templateUrl: './transaction-calendar-view.component.html',
  styleUrls: ['./transaction-calendar-view.component.sass']
})
export class TransactionCalendarViewComponent {

  /**
   * Loading flag.
   */
  public loading = false;

  public transactions: Transaction[] = [];

  public startDate: string | undefined = undefined;

  public endDate: string | undefined = undefined;

  constructor(
    private service: TransactionService
  ) { }

  public onDateChange(date: Date) {
    this.startDate = (date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());

    const numDaysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    this.endDate = (date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + numDaysInMonth);

    this.load();
  }

  private load() {
    this.service.getAll(undefined, this.startDate, this.endDate).subscribe({
      next: page => {
        this.transactions = page.content;
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
