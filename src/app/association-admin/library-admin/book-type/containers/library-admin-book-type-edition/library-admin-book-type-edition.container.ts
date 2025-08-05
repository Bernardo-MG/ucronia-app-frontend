
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookType } from '@app/models/library/book-type';
import { AuthContainer } from '@bernardo-mg/authentication';
import { ControlButtonsComponent, InfoEditorStatusComponent } from '@bernardo-mg/form';
import { ResponsiveShortColumnsDirective } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { Observable } from 'rxjs';
import { LibraryAdminBookTypeFormComponent } from '../../components/library-admin-book-type-form/library-admin-book-type-form.component';
import { BookTypeAdminService } from '../../services/book-type-admin.service';

@Component({
  selector: 'assoc-library-admin-book-type-edition',
  imports: [CardModule, SkeletonModule, LibraryAdminBookTypeFormComponent, ControlButtonsComponent, ResponsiveShortColumnsDirective],
  templateUrl: './library-admin-book-type-edition.container.html'
})
export class LibraryAdminBookTypeInfoEditorContainer extends InfoEditorStatusComponent<BookType> {

  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  private readonly service = inject(BookTypeAdminService);

  private number = -1;

  constructor() {
    const authContainer = inject(AuthContainer);

    super(new BookType());
    // Check permissions
    this.editable = authContainer.hasPermission("library_book_type", "update");
    this.deletable = authContainer.hasPermission("library_book_type", "delete");

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

  protected override read(): Observable<BookType> {
    return this.service.getOne(this.number);
  }

  protected override save(toSave: BookType): Observable<BookType> {
    return this.service.update(this.data.number, toSave);
  }

}
