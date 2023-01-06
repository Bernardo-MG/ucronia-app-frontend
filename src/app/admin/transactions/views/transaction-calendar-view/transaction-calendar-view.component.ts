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

  constructor(
    private service: TransactionService
  ) { }

  public onDateChange(date: Date) {
    const startDate = (date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());

    const numDaysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const endDate = (date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + numDaysInMonth);

    this.load(startDate, endDate);
  }

  private load(startDate: string, endDate: string) {
    this.service.getAll(undefined, startDate, endDate).subscribe({
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
