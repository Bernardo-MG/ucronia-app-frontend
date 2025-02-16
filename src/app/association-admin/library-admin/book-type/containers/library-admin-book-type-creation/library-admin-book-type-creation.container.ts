import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookType } from '@app/models/library/book-type';
import { CardBodyComponent } from '@app/shared/card/components/card-body/card-body.component';
import { CardComponent } from '@app/shared/card/components/card/card.component';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';
import { ArticleComponent } from '@bernardo-mg/layout';
import { Observable } from 'rxjs';
import { LibraryAdminBookTypeFormComponent } from '../../components/library-admin-book-type-form/library-admin-book-type-form.component';
import { BookTypeAdminService } from '../../services/book-type-admin.service';

@Component({
    selector: 'assoc-library-admin-book-type-creation',
    imports: [LibraryAdminBookTypeFormComponent, ArticleComponent, CardComponent, CardBodyComponent, ResponsiveShortColumnsDirective],
    templateUrl: './library-admin-book-type-creation.container.html'
})
export class LibraryAdminBookTypeCreateContainer extends CreateComponent<BookType> {

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
