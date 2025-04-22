import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from '@app/models/library/author';
import { CreateComponent } from '@bernardo-mg/form';
import { ArticleComponent, CardBodyComponent, CardComponent, ResponsiveShortColumnsDirective } from '@bernardo-mg/ui';
import { Observable } from 'rxjs';
import { LibraryAdminAuthorFormComponent } from '../../components/library-admin-author-form/library-admin-author-form.component';
import { AuthorAdminService } from '../../services/author-admin.service';

@Component({
  selector: 'assoc-library-admin-author-creation',
  imports: [LibraryAdminAuthorFormComponent, ArticleComponent, CardComponent, CardBodyComponent, ResponsiveShortColumnsDirective],
  templateUrl: './library-admin-author-creation.container.html'
})
export class LibraryAdminAuthorCreateContainer extends CreateComponent<Author> {

  private readonly service = inject(AuthorAdminService);

  private readonly router = inject(Router);

  private readonly route = inject(ActivatedRoute);

  protected override save(toSave: Author): Observable<Author> {
    return this.service.create(toSave);
  }

  protected override handleSaveSuccess(saved: Author) {
    super.handleSaveSuccess(saved);
    this.router.navigate(['..'], { relativeTo: this.route });
  }

}
