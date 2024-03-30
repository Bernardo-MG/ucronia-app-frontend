import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { Observable } from 'rxjs';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { LibraryBookInfoComponent } from '../library-book-info/library-book-info.component';

@Component({
  selector: 'assoc-library-book-info-widget',
  standalone: true,
  imports: [CommonModule, ArticleComponent, LibraryBookInfoComponent],
  templateUrl: './library-book-info-widget.component.html'
})
export class LibraryBookInfoWidgetComponent implements OnInit {

  /**
   * Reading flag. Active while the data is being read.
   */
  protected reading = false;

  private index = -1;

  public data = new Book();

  constructor(
    private route: ActivatedRoute,
    private service: BookService
  ) {}

  public ngOnInit(): void {
    // Get id
    this.route.paramMap.subscribe(params => {
      const indexParam = params.get('index');
      if (indexParam) {
        this.index = Number(indexParam);
      }
      this.load();
    });
  }

  private load(): void {
    this.reading = true;
    this.read()
      .subscribe({
        next: response => {
          this.data = response;
          this.reading = false;
        },
        error: error => {
          this.reading = false;
        }
      });
  }

  private read(): Observable<Book> {
    return this.service.getOne(this.index);
  }

}
