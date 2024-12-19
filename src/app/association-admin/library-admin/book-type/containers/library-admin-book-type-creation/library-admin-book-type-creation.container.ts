import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookType } from '@app/models/library/book-type';
import { CardModule } from '@app/shared/card/card.module';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';
import { Observable } from 'rxjs';
import { BookTypeAdminService } from '../../services/book-type-admin.service';
import { LibraryAdminBookTypeFormComponent } from '../../components/library-admin-book-type-form/library-admin-book-type-form.component';

@Component({
  selector: 'assoc-library-admin-book-type-creation',
  standalone: true,
  imports: [CardModule, LibraryAdminBookTypeFormComponent, ArticleComponent, ResponsiveShortColumnsDirective],
  templateUrl: './library-admin-book-type-creation.container.html'
})
export class LibraryAdminBookTypeCreateComponent extends CreateComponent<BookType> {

  constructor(
    private service: BookTypeAdminService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  protected override save(toSave: BookType): Observable<BookType> {
    return this.service.create(toSave);
  }

  protected override handleSaveSuccess(saved: BookType) {
    super.handleSaveSuccess(saved);
    this.router.navigate(['../..'], { relativeTo: this.route });
  }

}
