import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Author } from '@app/association/library/models/author';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';
import { Observable } from 'rxjs';
import { AuthorAdminService } from '../../../services/author-admin.service';
import { LibraryAdminAuthorFormComponent } from '../library-admin-author-form/library-admin-author-form.component';

@Component({
  selector: 'assoc-library-admin-author-create',
  standalone: true,
  imports: [LibraryAdminAuthorFormComponent, ArticleComponent, ResponsiveShortColumnsDirective],
  templateUrl: './library-admin-author-create.component.html'
})
export class LibraryAdminAuthorCreateComponent extends CreateComponent<Author> {

  constructor(
    private service: AuthorAdminService,
    rt: Router
  ) {
    super(rt);
  }

  protected override save(toSave: Author): Observable<Author> {
    return this.service.create(toSave);
  }

  protected override getReturnRoute(saved: Author): string {
    return '/library/admin';
  }

}
