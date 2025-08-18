
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookInfo } from '@app/domain/library/book-info';
import { FictionBook } from '@app/domain/library/fiction-book';
import { GameBook } from '@app/domain/library/game-book';
import { Language } from '@app/domain/library/language';
import { CreateComponent } from '@bernardo-mg/form';
import { ResponsiveShortColumnsDirective } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';
import { Observable } from 'rxjs';
import { LibraryAdminBookCreationFormComponent } from '../../components/library-admin-book-creation-form/library-admin-book-creation-form.component';
import { BookAdminService } from '../../services/book-admin.service';

@Component({
  selector: 'assoc-library-admin-fiction-book-creation',
  imports: [CardModule, LibraryAdminBookCreationFormComponent, ResponsiveShortColumnsDirective],
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
