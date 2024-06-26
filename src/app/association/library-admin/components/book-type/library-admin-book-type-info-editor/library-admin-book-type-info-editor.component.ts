import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookTypeAdminService } from '@app/association/library-admin/services/book-type-admin.service';
import { BookType } from '@app/association/library/models/book-type';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { InfoEditorStatusComponent } from '@app/shared/form/components/info-editor-status/info-editor-status.component';
import { FormModule } from '@app/shared/form/form.module';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { Observable } from 'rxjs';
import { LibraryAdminBookTypeFormComponent } from '../library-admin-book-type-form/library-admin-book-type-form.component';
import { LibraryAdminBookTypeInfoComponent } from '../library-admin-book-type-info/library-admin-book-type-info.component';

@Component({
  selector: 'assoc-library-admin-book-type-info-editor',
  standalone: true,
  imports: [CommonModule, FormModule, LibraryAdminBookTypeFormComponent, LibraryAdminBookTypeInfoComponent, ArticleComponent],
  templateUrl: './library-admin-book-type-info-editor.component.html'
})
export class LibraryAdminBookTypeInfoEditorComponent extends InfoEditorStatusComponent<BookType> implements OnInit {

  private name = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: BookTypeAdminService,
    private authContainer: AuthContainer
  ) {
    super(new BookType());
  }

  public ngOnInit(): void {
    // Check permissions
    this.editable = false;
    this.deletable = this.authContainer.hasPermission("library_book_type", "delete");

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

  protected override read(): Observable<BookType> {
    return this.service.getOne(this.name);
  }

  protected override save(toSave: BookType): Observable<BookType> {
    return this.service.update(this.data.name, toSave);
  }

}
