import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '@app/models/library/book';
import { Language } from '@app/models/library/language';
import { CreateComponent } from '@bernardo-mg/form';
import { CardBodyComponent, CardComponent, ResponsiveShortColumnsDirective } from '@bernardo-mg/layout';
import { Observable } from 'rxjs';
import { LibraryAdminBookCreationFormComponent } from '../../components/library-admin-book-creation-form/library-admin-book-creation-form.component';
import { BookAdminService } from '../../services/book-admin.service';

@Component({
  selector: 'assoc-library-admin-book-creation',
  imports: [CommonModule, LibraryAdminBookCreationFormComponent, CardComponent, CardBodyComponent, ResponsiveShortColumnsDirective],
  templateUrl: './library-admin-book-creation.container.html'
})
export class LibraryAdminBookCreationContainer extends CreateComponent<Book> implements OnInit {

  private service = inject(BookAdminService);

  private router = inject(Router);

  private route = inject(ActivatedRoute);

  public languages: Language[] = [];

  public ngOnInit(): void {
    this.languages = this.service.getLanguages();
  }

  protected override save(toSave: Book): Observable<Book> {
    return this.service.create(toSave);
  }

  protected override handleSaveSuccess(saved: Book) {
    super.handleSaveSuccess(saved);
    this.router.navigate(['../..'], { relativeTo: this.route });
  }

}
