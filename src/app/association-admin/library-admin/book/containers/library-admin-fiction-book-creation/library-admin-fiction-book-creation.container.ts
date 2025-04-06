import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookInfo } from '@app/models/library/book-info';
import { FictionBook } from '@app/models/library/fiction-book';
import { GameBook } from '@app/models/library/game-book';
import { Language } from '@app/models/library/language';
import { CreateComponent } from '@bernardo-mg/form';
import { CardBodyComponent, CardComponent, ResponsiveShortColumnsDirective } from '@bernardo-mg/layout';
import { Observable } from 'rxjs';
import { LibraryAdminBookCreationFormComponent } from '../../components/library-admin-book-creation-form/library-admin-book-creation-form.component';
import { BookAdminService } from '../../services/book-admin.service';

@Component({
  selector: 'assoc-library-admin-fiction-book-creation',
  imports: [CommonModule, LibraryAdminBookCreationFormComponent, CardComponent, CardBodyComponent, ResponsiveShortColumnsDirective],
  templateUrl: './library-admin-fiction-book-creation.container.html'
})
export class LibraryAdminFictionBookCreationContainer extends CreateComponent<FictionBook> {

  private readonly service = inject(BookAdminService);

  private readonly router = inject(Router);

  private readonly route = inject(ActivatedRoute);

  public readonly languages: Language[];

  constructor() {
    super();
    this.languages = this.service.getLanguages();
  }

  public onSaveInfo(data: BookInfo) {
    const book = { ...data } as FictionBook;
    super.onSave(book);
  }

  protected override save(toSave: FictionBook): Observable<FictionBook> {
    return this.service.createFictionBook(toSave);
  }

  protected override handleSaveSuccess(saved: GameBook) {
    super.handleSaveSuccess(saved);
    this.router.navigate(['../..'], { relativeTo: this.route });
  }

}
