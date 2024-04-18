import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { EditorHeaderComponent } from '@app/shared/form/components/editor-header/editor-header.component';
import { InfoEditorStatusComponent } from '@app/shared/form/components/info-editor-status/info-editor-status.component';
import { InfoEditorComponent } from '@app/shared/form/components/info-editor/info-editor.component';
import { InfoEditorFormDirective } from '@app/shared/form/directives/info-editor-form.directive';
import { InfoEditorInfoDirective } from '@app/shared/form/directives/info-editor-info.directive';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { Observable } from 'rxjs';
import { Author } from '../../models/author';
import { BookType } from '../../models/book-type';
import { AuthorAdminService } from '../../services/author-admin.service';
import { LibraryAdminAuthorFormComponent } from '../library-admin-author-form/library-admin-author-form.component';
import { LibraryAdminAuthorInfoComponent } from '../library-admin-author-info/library-admin-author-info.component';

@Component({
  selector: 'assoc-library-admin-author-info-editor',
  standalone: true,
  imports: [CommonModule, LibraryAdminAuthorFormComponent, LibraryAdminAuthorInfoComponent, ArticleComponent, InfoEditorComponent, EditorHeaderComponent, InfoEditorFormDirective, InfoEditorInfoDirective],
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
      this.router.navigate(['/library']);
    });
  }

  protected override read(): Observable<BookType> {
    return this.service.getOne(this.name);
  }

  protected override save(toSave: BookType): Observable<BookType> {
    return this.service.update(this.data.name, toSave);
  }

}
