import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameBook } from '@app/models/library/game-book';
import { Language } from '@app/models/library/language';
import { CardBodyComponent, CardComponent, CardHeaderComponent, PlaceholderDirective, ResponsiveShortColumnsDirective } from '@bernardo-mg/layout';
import { LibraryBookDetailsComponent } from '../../components/library-book-details/library-book-details.component';
import { LibraryBookLendingsComponent } from '../../components/library-book-lendings/library-book-lendings.component';
import { BookService } from '../../services/book.service';

@Component({
    selector: 'assoc-library-book-info',
    imports: [CommonModule, LibraryBookDetailsComponent, LibraryBookLendingsComponent, ResponsiveShortColumnsDirective, PlaceholderDirective, CardComponent, CardBodyComponent, CardHeaderComponent],
    templateUrl: './library-book-info.container.html'
})
export class LibraryBookInfoContainer implements OnInit {

  public languages: Language[] = [];

  /**
   * Reading flag. Active while the data is being read.
   */
  protected waiting = false;

  private index = -1;

  public data = new GameBook();

  constructor(
    private route: ActivatedRoute,
    private service: BookService
  ) { }

  public ngOnInit(): void {

    // Get id
    this.route.paramMap.subscribe(params => {
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
    this.service.getOne(this.index)
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
