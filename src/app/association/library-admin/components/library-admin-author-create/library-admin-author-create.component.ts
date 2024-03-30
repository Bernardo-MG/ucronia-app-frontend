import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { Observable } from 'rxjs';
import { Author } from '../../models/author';
import { AuthorAdminService } from '../../services/author-admin.service';
import { LibraryAdminAuthorFormComponent } from '../library-admin-author-form/library-admin-author-form.component';

@Component({
  selector: 'assoc-library-admin-author-create',
  standalone: true,
  imports: [LibraryAdminAuthorFormComponent, ArticleComponent],
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
