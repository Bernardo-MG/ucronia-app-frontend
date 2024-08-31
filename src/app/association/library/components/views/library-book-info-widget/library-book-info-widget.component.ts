import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibraryBookLendingComponent } from '@app/association/library-lending/shared/components/library-book-lending/library-book-lending.component';
import { LibraryBookReturnComponent } from '@app/association/library-lending/shared/components/library-book-return/library-book-return.component';
import { Language } from '@app/association/library/models/language';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { CardModule } from '@app/shared/card/card.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { ModalComponent } from '@app/shared/layout/components/modal/modal.component';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';
import { Observable } from 'rxjs';
import { Book } from '../../../models/book';
import { BookService } from '../../../services/book.service';
import { LibraryBookInfoComponent } from '../../info/library-book-info/library-book-info.component';
import { LibraryBookLendingsComponent } from '../../info/library-book-lendings/library-book-lendings.component';

@Component({
  selector: 'assoc-library-book-info-widget',
  standalone: true,
  imports: [CommonModule, IconsModule, CardModule, ArticleComponent, LibraryBookInfoComponent, LibraryBookLendingComponent, LibraryBookLendingsComponent, LibraryBookReturnComponent, ModalComponent, ResponsiveShortColumnsDirective],
  templateUrl: './library-book-info-widget.component.html'
})
export class LibraryBookInfoWidgetComponent implements OnInit {

  @ViewChild('lendCloseButton') lendCloseButton: any;

  @ViewChild('returnCloseButton') returnCloseButton: any;

  public languages: Language[] = [];

  public lendPermission = false;
  
  public get lendDisabled() {
    return this.waiting || !this.lendPermission;
  }

  /**
   * Reading flag. Active while the data is being read.
   */
  protected waiting = false;

  private index = -1;

  public data = new Book();

  constructor(
    private route: ActivatedRoute,
    private service: BookService,
    private authContainer: AuthContainer
  ) { }

  public ngOnInit(): void {
    // Check permissions
    this.lendPermission = this.authContainer.hasPermission("library_lending", "update");

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

  public onCloseLend() {
    this.lendCloseButton.nativeElement.click();
    this.load();
  }

  public onCloseReturn() {
    this.returnCloseButton.nativeElement.click();
    this.load();
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
