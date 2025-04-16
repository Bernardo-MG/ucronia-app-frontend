import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from '@app/models/library/author';
import { AuthContainer } from '@bernardo-mg/authentication';
import { InfoEditorStatusComponent } from '@bernardo-mg/form';
import { CardBodyComponent, CardComponent, ResponsiveShortColumnsDirective } from '@bernardo-mg/layout';
import { Observable } from 'rxjs';
import { LibraryAdminAuthorFormComponent } from '../../components/library-admin-author-form/library-admin-author-form.component';
import { LibraryAdminAuthorInfoComponent } from '../../components/library-admin-author-info/library-admin-author-info.component';
import { AuthorAdminService } from '../../services/author-admin.service';

@Component({
  selector: 'assoc-library-admin-author-edition',
  imports: [CommonModule, LibraryAdminAuthorFormComponent, LibraryAdminAuthorInfoComponent, ResponsiveShortColumnsDirective, CardComponent, CardBodyComponent],
  templateUrl: './library-admin-author-edition.container.html'
})
export class LibraryAdminAuthorInfoEditorContainer extends InfoEditorStatusComponent<Author> {

  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  private readonly service = inject(AuthorAdminService);

  private number = -1;

  constructor(
    authContainer: AuthContainer
  ) {
    super(new Author());
    // Check permissions
    this.editable = authContainer.hasPermission("library_author", "update");
    this.deletable = authContainer.hasPermission("library_author", "delete");

    // Get id
    this.route.paramMap.subscribe(params => {
      const numberParam = params.get('number');
      if (numberParam) {
        this.number = Number(numberParam);
      }
      this.load();
    });
  }

  protected override delete(): void {
    this.service.delete(this.data.number).subscribe(r => {
      this.router.navigate(['..'], { relativeTo: this.route });
    });
  }

  protected override read(): Observable<Author> {
    return this.service.getOne(this.number);
  }

  protected override save(toSave: Author): Observable<Author> {
    return this.service.update(this.data.number, toSave);
  }

}
