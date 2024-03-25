import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { Observable } from 'rxjs';
import { BookType } from '../../models/book-type';
import { BookTypeService } from '../../services/book-type.service';
import { LibraryBookTypeFormComponent } from '../library-book-type-form/library-book-type-form.component';

@Component({
  selector: 'assoc-library-book-type-create',
  standalone: true,
  imports: [ LayoutModule, LibraryBookTypeFormComponent ],
  templateUrl: './library-book-type-create.component.html'
})
export class LibraryBookTypeCreateComponent extends CreateComponent<BookType> {

  constructor(
    private service: BookTypeService,
    rt: Router
  ) {
    super(rt);
  }

  protected override save(toSave: BookType): Observable<BookType> {
    return this.service.create(toSave);
  }

  protected override getReturnRoute(saved: BookType): string {
    return `/library/bookType/${saved.name}`;
  }

}
