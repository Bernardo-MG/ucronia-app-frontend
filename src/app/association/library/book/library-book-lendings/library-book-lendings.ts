
import { DatePipe } from '@angular/common';
import { Component, input, OnChanges, SimpleChanges } from '@angular/core';
import { BookLending } from '@ucronia/domain';
import { TimelineModule } from 'primeng/timeline';

@Component({
  selector: 'assoc-library-book-lendings',
  imports: [TimelineModule, DatePipe],
  templateUrl: './library-book-lendings.html'
})
export class LibraryBookLendings implements OnChanges {

  public readonly lendings = input<BookLending[]>([]);
  public readonly borrowerNames = input<Record<number, string>>({});

  public history: { date: Date, lent: boolean, borrower: string }[] = [];

  public ngOnChanges({ lendings, borrowerNames }: SimpleChanges): void {
    if (lendings || borrowerNames) {
      this.rebuildHistory();
    }
  }

  private rebuildHistory(): void {
    const result: { date: Date, lent: boolean, borrower: string }[] = [];
    this.lendings().forEach(d => {
      const borrower = this.borrowerNames()[d.borrower] ?? `${d.borrower}`;

      result.push({ borrower, date: d.lendingDate, lent: true });
      if (d.returnDate) {
        result.push({ borrower, date: d.returnDate, lent: false });
      }
    });

    this.history = result;
  }

}
