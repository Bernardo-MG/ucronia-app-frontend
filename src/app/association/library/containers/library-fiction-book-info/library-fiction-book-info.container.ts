import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FictionBook } from '@app/models/library/fiction-book';
import { Language } from '@app/models/library/language';
import { CardBodyComponent, CardComponent, CardHeaderComponent, PlaceholderDirective, ResponsiveShortColumnsDirective } from '@bernardo-mg/layout';
import { LibraryBookLendingsComponent } from '../../components/library-book-lendings/library-book-lendings.component';
import { LibraryFictionBookDetailsComponent } from '../../components/library-fiction-book-details/library-fiction-book-details.component';
import { BookService } from '../../services/book.service';

@Component({
    selector: 'assoc-library-fiction-book-info',
    imports: [CommonModule, LibraryFictionBookDetailsComponent, LibraryBookLendingsComponent, ResponsiveShortColumnsDirective, PlaceholderDirective, CardComponent, CardBodyComponent, CardHeaderComponent],
    templateUrl: './library-fiction-book-info.container.html'
})
export class LibraryFictionBookInfoContainer implements OnInit {

  public languages: Language[] = [];

  /**
   * Reading flag. Active while the data is being read.
   */
  protected waiting = false;

  private index = -1;

  public data = new FictionBook();

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
    this.service.getOneFictionBook(this.index)
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
