import { DatePipe, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { Component, computed, input, output } from '@angular/core';
import { BookLending } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

registerLocaleData(localeEs);

@Component({
  selector: 'assoc-library-book-lendings',
  imports: [DatePipe, ButtonModule, TooltipModule],
  templateUrl: './library-book-lendings.html',
  styleUrl: './library-book-lendings.scss'
})
export class LibraryBookLendings {

  public readonly lendings = input<BookLending[]>([]);
  public readonly borrowerNames = input<Record<number, string>>({});
  public readonly showLending = output<BookLending>();

  public readonly history = computed(() => this.lendings()
    .map(lending => {
      const borrower = this.borrowerNames()[lending.borrower]?.trim() || `${lending.borrower}`;
      const words = borrower.split(/\s+/);
      const initials = words.length > 1
        ? `${words[0][0]}${words[words.length - 1][0]}`
        : borrower.slice(0, 2);
      return { lending, borrower, initials: initials.toUpperCase(), active: !lending.returnDate };
    })
    .sort((left, right) => Number(right.active) - Number(left.active)
      || new Date(right.lending.lendingDate).getTime() - new Date(left.lending.lendingDate).getTime()));

}
