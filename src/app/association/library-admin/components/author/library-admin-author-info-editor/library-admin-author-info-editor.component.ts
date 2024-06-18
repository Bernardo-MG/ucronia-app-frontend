import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from '@app/association/library/models/author';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { InfoEditorStatusComponent } from '@app/shared/form/components/info-editor-status/info-editor-status.component';
import { FormModule } from '@app/shared/form/form.module';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { Observable } from 'rxjs';
import { AuthorAdminService } from '../../../services/author-admin.service';
import { LibraryAdminAuthorFormComponent } from '../library-admin-author-form/library-admin-author-form.component';
import { LibraryAdminAuthorInfoComponent } from '../library-admin-author-info/library-admin-author-info.component';

@Component({
  selector: 'assoc-library-admin-author-info-editor',
  standalone: true,
  imports: [CommonModule, FormModule, LibraryAdminAuthorFormComponent, LibraryAdminAuthorInfoComponent, ArticleComponent],
  templateUrl: './library-admin-author-info-editor.component.html'
})
export class LibraryAdminAuthorInfoEditorComponent extends InfoEditorStatusComponent<Author> implements OnInit {

  private name = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AuthorAdminService,
    private authContainer: AuthContainer
  ) {
    super(new Author());
  }

  public ngOnInit(): void {
    // Check permissions
    this.editable = false;
    this.deletable = this.authContainer.hasPermission("library_author", "delete");

    // Get id
    this.route.paramMap.subscribe(params => {
      const nameParam = params.get('name');
      if (nameParam) {
        this.name = nameParam;
      }
      this.load();
    });
  }

  protected override delete(): void {
    this.service.delete(this.data.name).subscribe(r => {
      this.router.navigate(['/library/admin']);
    });
  }

  protected override read(): Observable<Author> {
    return this.service.getOne(this.name);
  }

  protected override save(toSave: Author): Observable<Author> {
    return this.service.update(this.data.name, toSave);
  }

}
