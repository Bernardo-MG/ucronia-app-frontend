import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from '@app/models/library/author';
import { CardBodyComponent } from '@app/shared/card/components/card-body/card-body.component';
import { CardComponent } from '@app/shared/card/components/card/card.component';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';
import { ArticleComponent } from '@bernardo-mg/layout';
import { Observable } from 'rxjs';
import { LibraryAdminAuthorFormComponent } from '../../components/library-admin-author-form/library-admin-author-form.component';
import { AuthorAdminService } from '../../services/author-admin.service';

@Component({
    selector: 'assoc-library-admin-author-creation',
    imports: [LibraryAdminAuthorFormComponent, ArticleComponent, CardComponent, CardBodyComponent, ResponsiveShortColumnsDirective],
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
