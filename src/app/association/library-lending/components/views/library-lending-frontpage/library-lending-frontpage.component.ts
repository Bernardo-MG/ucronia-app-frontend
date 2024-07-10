import { Component } from '@angular/core';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { BookLendingFormComponent } from '../../data/book-lending-form/book-lending-form.component';

@Component({
  selector: 'assoc-library-lend-frontpage',
  standalone: true,
  imports: [ ArticleComponent, BookLendingFormComponent ],
  templateUrl: './library-lending-frontpage.component.html'
})
export class LibraryLendingFrontpageComponent {

}
