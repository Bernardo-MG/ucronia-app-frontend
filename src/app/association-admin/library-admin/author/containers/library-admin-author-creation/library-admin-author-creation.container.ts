import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from '@app/models/library/author';
import { CardModule } from '@app/shared/card/card.module';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';
import { Observable } from 'rxjs';
import { LibraryAdminAuthorFormComponent } from '../../components/library-admin-author-form/library-admin-author-form.component';
import { AuthorAdminService } from '../../services/author-admin.service';

@Component({
    selector: 'assoc-library-admin-author-creation',
    imports: [CardModule, LibraryAdminAuthorFormComponent, ArticleComponent, ResponsiveShortColumnsDirective],
    templateUrl: './library-admin-author-creation.container.html'
})
export class LibraryAdminAuthorCreateContainer extends CreateComponent<Author> {

  constructor(
    private service: AuthorAdminService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  protected override save(toSave: Author): Observable<Author> {
    return this.service.create(toSave);
  }

  protected override handleSaveSuccess(saved: Author) {
    super.handleSaveSuccess(saved);
    this.router.navigate(['../..'], { relativeTo: this.route });
  }

}
