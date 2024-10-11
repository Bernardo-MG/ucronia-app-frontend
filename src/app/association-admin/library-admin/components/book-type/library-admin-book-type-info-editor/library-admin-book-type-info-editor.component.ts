import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookTypeAdminService } from '@app/association-admin/library-admin/services/book-type-admin.service';
import { BookType } from '@app/models/library/book-type';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { CardModule } from '@app/shared/card/card.module';
import { InfoEditorStatusComponent } from '@app/shared/form/components/info-editor-status/info-editor-status.component';
import { FormModule } from '@app/shared/form/form.module';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';
import { Observable } from 'rxjs';
import { LibraryAdminBookTypeFormComponent } from '../library-admin-book-type-form/library-admin-book-type-form.component';

@Component({
  selector: 'assoc-library-admin-book-type-info-editor',
  standalone: true,
  imports: [CommonModule, FormModule, CardModule, LibraryAdminBookTypeFormComponent, ArticleComponent, ResponsiveShortColumnsDirective],
  templateUrl: './library-admin-book-type-info-editor.component.html'
})
export class LibraryAdminBookTypeInfoEditorComponent extends InfoEditorStatusComponent<BookType> implements OnInit {

  private number = -1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: BookTypeAdminService,
    private authContainer: AuthContainer
  ) {
    super(new BookType());
  }

  public ngOnInit(): void {
    // Activate edition
    this.editing = true;

    // Check permissions
    this.editable = this.authContainer.hasPermission("library_book_type", "update");
    this.deletable = this.authContainer.hasPermission("library_book_type", "delete");

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
      this.router.navigate(['../..'], { relativeTo: this.route });
    });
  }

  protected override read(): Observable<BookType> {
    return this.service.getOne(this.number);
  }

  protected override save(toSave: BookType): Observable<BookType> {
    return this.service.update(this.data.number, toSave);
  }

}
