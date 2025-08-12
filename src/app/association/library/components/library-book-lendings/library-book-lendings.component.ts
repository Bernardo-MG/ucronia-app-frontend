
import { Component, Input } from '@angular/core';
import { BookLending } from '@app/models/library/book-lending';
import { TableModule } from 'primeng/table';
import { TimelineModule } from 'primeng/timeline';

@Component({
  selector: 'assoc-library-book-lendings',
  imports: [TableModule, TimelineModule],
  templateUrl: './library-book-lendings.component.html',
  styleUrl: './library-book-lendings.component.sass'
})
export class LibraryBookLendingsComponent {

  public history: { date: string, lent: boolean, borrower: string }[] = [];

  @Input() public set lendings(data: BookLending[]) {
    const result: { date: string, lent: boolean, borrower: string }[] = [];
    data.forEach(d => {
      result.push({ borrower: d.borrower.name.fullName, date: d.lendingDate, lent: true });
      if (d.returnDate) {
        result.push({ borrower: d.borrower.name.fullName, date: d.returnDate, lent: false });
      }
    });
    this.history = result;
  }

}
