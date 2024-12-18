import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '@app/models/library/book';
import { Language } from '@app/models/library/language';
import { CardModule } from '@app/shared/card/card.module';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';
import { Observable } from 'rxjs';
import { BookService } from '../../../services/book.service';
import { LibraryBookInfoComponent } from '../../info/library-book-info/library-book-info.component';
import { LibraryBookLendingsComponent } from '../../info/library-book-lendings/library-book-lendings.component';

@Component({
  selector: 'assoc-library-book-info-widget',
  standalone: true,
  imports: [CommonModule, CardModule, ArticleComponent, LibraryBookInfoComponent, LibraryBookLendingsComponent, ResponsiveShortColumnsDirective],
  templateUrl: './library-book-info-widget.component.html'
})
export class LibraryBookInfoWidgetComponent implements OnInit {

  public languages: Language[] = [];

  /**
   * Reading flag. Active while the data is being read.
   */
  protected waiting = false;

  private index = -1;

  public data = new Book();

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
      }
      this.load();
    });

    // Load languages
    this.languages = this.service.getLanguages();
  }

  private load(): void {
    this.waiting = true;
    this.read()
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

  private read(): Observable<Book> {
    return this.service.getOne(this.index);
  }

}
