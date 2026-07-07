
import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BookLending } from '@ucronia/domain';
import { TimelineModule } from 'primeng/timeline';

@Component({
  selector: 'assoc-library-book-lendings',
  imports: [TimelineModule, DatePipe],
  templateUrl: './library-book-lendings.html'
})
export class LibraryBookLendings {

  private lendingsData: BookLending[] = [];
  private borrowerNamesData: Record<number, string> = {};

  public history: { date: Date, lent: boolean, borrower: string }[] = [];

  @Input() public set lendings(data: BookLending[]) {
    this.lendingsData = data ?? [];
    this.rebuildHistory();
  }

  @Input() public set borrowerNames(data: Record<number, string>) {
    this.borrowerNamesData = data ?? {};
    this.rebuildHistory();
  }

  private rebuildHistory(): void {
    const result: { date: Date, lent: boolean, borrower: string }[] = [];
    this.lendingsData.forEach(d => {
      const borrower = this.borrowerNamesData[d.borrower] ?? `${d.borrower}`;

      result.push({ borrower, date: d.lendingDate, lent: true });
      if (d.returnDate) {
        result.push({ borrower, date: d.returnDate, lent: false });
      }
    });

    this.history = result;
  }

}
