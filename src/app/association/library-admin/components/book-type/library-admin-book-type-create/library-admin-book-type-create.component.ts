import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookTypeAdminService } from '@app/association/library-admin/services/book-type-admin.service';
import { BookType } from '@app/association/library/models/book-type';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { Observable } from 'rxjs';
import { LibraryAdminBookTypeFormComponent } from '../library-admin-book-type-form/library-admin-book-type-form.component';

@Component({
  selector: 'assoc-library-admin-book-type-create',
  standalone: true,
  imports: [ LibraryAdminBookTypeFormComponent, ArticleComponent ],
  templateUrl: './library-admin-book-type-create.component.html'
})
export class LibraryAdminBookTypeCreateComponent extends CreateComponent<BookType> {

  constructor(
    private service: BookTypeAdminService,
    rt: Router
  ) {
    super(rt);
  }

  protected override save(toSave: BookType): Observable<BookType> {
    return this.service.create(toSave);
  }

  protected override getReturnRoute(saved: BookType): string {
    return '/library/admin';
  }

}
