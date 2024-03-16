import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { Observable } from 'rxjs';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { LibraryBookFormComponent } from '../library-book-form/library-book-form.component';

@Component({
  selector: 'assoc-library-book-create',
  standalone: true,
  imports: [ LayoutModule, LibraryBookFormComponent ],
  templateUrl: './library-book-create.component.html'
})
export class LibraryBookCreateComponent extends CreateComponent<Book> {

  constructor(
    private service: BookService,
    rt: Router
  ) {
    super(rt);
  }

  protected override save(toSave: Book): Observable<Book> {
    return this.service.create(toSave);
  }

  protected override getReturnRoute(saved: Book): string {
    return `/library/book/${saved.isbn}`;
  }

}
