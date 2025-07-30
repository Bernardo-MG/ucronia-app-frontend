
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookInfo } from '@app/models/library/book-info';
import { Language } from '@app/models/library/language';
import { CreateComponent } from '@bernardo-mg/form';
import { ResponsiveShortColumnsDirective } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';
import { Observable } from 'rxjs';
import { LibraryAdminBookCreationFormComponent } from '../../components/library-admin-book-creation-form/library-admin-book-creation-form.component';
import { BookAdminService } from '../../services/book-admin.service';

@Component({
  selector: 'assoc-library-admin-game-book-creation',
  imports: [CardModule, LibraryAdminBookCreationFormComponent, ResponsiveShortColumnsDirective],
  templateUrl: './library-admin-game-book-creation.container.html'
})
export class LibraryAdminGameBookCreationContainer extends CreateComponent<BookInfo> {

  private readonly service = inject(BookAdminService);

  private readonly router = inject(Router);

  private readonly route = inject(ActivatedRoute);

  public readonly languages: Language[] = [];

  constructor() {
    super();
    this.languages = this.service.getLanguages();
  }

  protected override save(toSave: BookInfo): Observable<BookInfo> {
    return this.service.createGameBook(toSave);
  }

  protected override handleSaveSuccess(saved: BookInfo) {
    super.handleSaveSuccess(saved);
    this.router.navigate(['../..'], { relativeTo: this.route });
  }

}
