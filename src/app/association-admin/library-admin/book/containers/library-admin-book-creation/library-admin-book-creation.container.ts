import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookInfo } from '@app/models/library/book-info';
import { Language } from '@app/models/library/language';
import { CreateComponent } from '@bernardo-mg/form';
import { CardBodyComponent, CardComponent, ResponsiveShortColumnsDirective } from '@bernardo-mg/layout';
import { Observable } from 'rxjs';
import { LibraryAdminBookCreationFormComponent } from '../../../shared/components/library-admin-book-creation-form/library-admin-book-creation-form.component';
import { GameAdminService } from '../../services/book-admin.service';

@Component({
  selector: 'assoc-library-admin-book-creation',
  imports: [CommonModule, LibraryAdminBookCreationFormComponent, CardComponent, CardBodyComponent, ResponsiveShortColumnsDirective],
  templateUrl: './library-admin-book-creation.container.html'
})
export class LibraryAdminBookCreationContainer extends CreateComponent<BookInfo> {

  private readonly service = inject(GameAdminService);

  private readonly router = inject(Router);

  private readonly route = inject(ActivatedRoute);

  public readonly languages: Language[] = [];

  constructor() {
    super();
    this.languages = this.service.getLanguages();
  }

  protected override save(toSave: BookInfo): Observable<BookInfo> {
    return this.service.create(toSave);
  }

  protected override handleSaveSuccess(saved: BookInfo) {
    super.handleSaveSuccess(saved);
    this.router.navigate(['..'], { relativeTo: this.route });
  }

}
