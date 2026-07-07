
import { DatePipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { BookLending } from '@ucronia/domain';
import { TableModule } from 'primeng/table';
import { TimelineModule } from 'primeng/timeline';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { LibraryService } from '../library-service';

@Component({
  selector: 'assoc-library-book-lendings',
  imports: [TableModule, TimelineModule, DatePipe],
  templateUrl: './library-book-lendings.html'
})
export class LibraryBookLendings {

  private readonly libraryService = inject(LibraryService);
  private loadId = 0;

  public history: { date: Date, lent: boolean, borrower: string }[] = [];

  @Input() public set lendings(data: BookLending[]) {
    const activeLoadId = ++this.loadId;

    this.resolveBorrowerNames(data)
      .subscribe((borrowerNames) => {
        if (activeLoadId !== this.loadId) {
          return;
        }

        const result: { date: Date, lent: boolean, borrower: string }[] = [];
        data.forEach(d => {
          const borrower = borrowerNames[d.borrower] ?? `${d.borrower}`;

          result.push({ borrower, date: d.lendingDate, lent: true });
          if (d.returnDate) {
            result.push({ borrower, date: d.returnDate, lent: false });
          }
        });

        this.history = result;
      });
  }

  private resolveBorrowerNames(lendings: BookLending[]): Observable<Record<number, string>> {
    const borrowerNumbers = [...new Set(lendings.map(lending => lending.borrower).filter(number => number > 0))];

    if (borrowerNumbers.length === 0) {
      return of({});
    }

    return forkJoin(
      borrowerNumbers.map(number =>
        this.libraryService.getBorrower(number)
          .pipe(
            map(profile => ({ number, name: profile.name.fullName })),
            catchError(() => of({ number, name: `${number}` }))
          )
      )
    )
      .pipe(
        map((borrowers) =>
          borrowers.reduce((accumulator, borrower) => {
            accumulator[borrower.number] = borrower.name;
            return accumulator;
          }, {} as Record<number, string>)
        )
      );
  }

}
