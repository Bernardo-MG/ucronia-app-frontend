import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameBook } from '@app/models/library/game-book';
import { Language } from '@app/models/library/language';
import { PlaceholderDirective, ResponsiveShortColumnsDirective } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';
import { LibraryBookLendingsComponent } from '../../components/library-book-lendings/library-book-lendings.component';
import { LibraryGameBookDetailsComponent } from '../../components/library-game-book-details/library-game-book-details.component';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'assoc-library-game-book-info',
  imports: [CommonModule, CardModule, LibraryGameBookDetailsComponent, LibraryBookLendingsComponent, ResponsiveShortColumnsDirective, PlaceholderDirective],
  templateUrl: './library-game-book-info.container.html'
})
export class LibraryGameBookInfoContainer {

  private readonly service = inject(BookService);

  public readonly languages: Language[] = [];

  /**
   * Reading flag. Active while the data is being read.
   */
  public waiting = false;

  private index = -1;

  public data = new GameBook();

  constructor(
    route: ActivatedRoute
  ) {

    // Get id
    route.paramMap.subscribe(params => {
      const indexParam = params.get('index');
      if (indexParam) {
        this.index = Number(indexParam);
        this.load();
      }
    });

    // Load languages
    this.languages = this.service.getLanguages();
  }

  private load(): void {
    this.waiting = true;
    this.service.getOneGameBook(this.index)
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
