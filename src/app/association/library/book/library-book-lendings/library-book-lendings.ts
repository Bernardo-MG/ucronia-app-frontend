
import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BookLending } from '@app/domain/library/book-lending';
import { TableModule } from 'primeng/table';
import { TimelineModule } from 'primeng/timeline';

@Component({
  selector: 'assoc-library-book-lendings',
  imports: [TableModule, TimelineModule, DatePipe],
  templateUrl: './library-book-lendings.html',
  styleUrl: './library-book-lendings.sass'
})
export class LibraryBookLendings {

  public history: { date: Date, lent: boolean, borrower: string }[] = [];

  @Input() public set lendings(data: BookLending[]) {
    const result: { date: Date, lent: boolean, borrower: string }[] = [];
    data.forEach(d => {
      result.push({ borrower: d.borrower.name.fullName, date: d.lendingDate, lent: true });
      if (d.returnDate) {
        result.push({ borrower: d.borrower.name.fullName, date: d.returnDate, lent: false });
      }
    });
    this.history = result;
  }

}
