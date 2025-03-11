import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookType } from '@app/models/library/book-type';
import { AuthContainer } from '@bernardo-mg/authentication';
import { InfoEditorStatusComponent } from '@bernardo-mg/form';
import { CardBodyComponent, CardComponent, ResponsiveShortColumnsDirective } from '@bernardo-mg/layout';
import { Observable } from 'rxjs';
import { LibraryAdminBookTypeFormComponent } from '../../components/library-admin-book-type-form/library-admin-book-type-form.component';
import { LibraryAdminBookTypeInfoComponent } from '../../components/library-admin-book-type-info/library-admin-book-type-info.component';
import { BookTypeAdminService } from '../../services/book-type-admin.service';

@Component({
  selector: 'assoc-library-admin-book-type-info-editor',
  imports: [CommonModule, LibraryAdminBookTypeFormComponent, LibraryAdminBookTypeInfoComponent, CardComponent, CardBodyComponent, ResponsiveShortColumnsDirective],
  templateUrl: './library-admin-book-type-info-editor.container.html'
})
export class LibraryAdminBookTypeInfoEditorContainer extends InfoEditorStatusComponent<BookType> implements OnInit {

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private service = inject(BookTypeAdminService);

  private authContainer = inject(AuthContainer);

  private number = -1;

  constructor() {
    super(new BookType());
  }

  public ngOnInit(): void {
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
