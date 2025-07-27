import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FictionBook } from '@app/models/library/fiction-book';
import { Language } from '@app/models/library/language';
import { PlaceholderDirective, ResponsiveShortColumnsDirective } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';
import { LibraryBookLendingsComponent } from '../../components/library-book-lendings/library-book-lendings.component';
import { LibraryFictionBookDetailsComponent } from '../../components/library-fiction-book-details/library-fiction-book-details.component';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'assoc-library-fiction-book-info',
  imports: [CommonModule, CardModule, LibraryFictionBookDetailsComponent, LibraryBookLendingsComponent, ResponsiveShortColumnsDirective, PlaceholderDirective],
  templateUrl: './library-fiction-book-info.container.html'
})
export class LibraryFictionBookInfoContainer {

  private readonly service = inject(BookService);

  public readonly languages: Language[] = [];

  /**
   * Reading flag. Active while the data is being read.
   */
  public waiting = false;

  public data = new FictionBook();

  constructor() {
    const route = inject(ActivatedRoute);


    // Get id
    route.paramMap.subscribe(params => {
      const indexParam = params.get('index');
      if (indexParam) {
        const index = Number(indexParam);
        this.load(index);
      }
    });

    // Load languages
    this.languages = this.service.getLanguages();
  }

  private load(index: number): void {
    this.waiting = true;
    this.service.getOneFictionBook(index)
      .subscribe({
        next: response => {
          this.data = response;
          this.waiting = false;
        },
        error: error => {
          this.waiting = false;
        }
      });
  }

}
