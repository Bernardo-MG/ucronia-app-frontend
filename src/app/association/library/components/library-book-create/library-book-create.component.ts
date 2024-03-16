import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { Observable } from 'rxjs';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { LibraryBookFormComponent } from '../library-book-form/library-book-form.component';
import { LibraryBookTypeSelectionComponent } from '../library-book-type-selection/library-book-type-selection.component';
import { LibraryGameSystemSelectionComponent } from '../library-game-system-selection/library-game-system-selection.component';

@Component({
  selector: 'assoc-library-book-create',
  standalone: true,
  imports: [CommonModule, LayoutModule, LibraryBookFormComponent, LibraryGameSystemSelectionComponent, LibraryBookTypeSelectionComponent],
  templateUrl: './library-book-create.component.html'
})
export class LibraryBookCreateComponent extends CreateComponent<Book> {

  public selectBookType = false;

  public selectGameSystem = false;

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

  public onShowBookTypeSelection() {
    this.selectBookType = true;
  }

  public onShowGameSystemSelection() {
    this.selectGameSystem = true;
  }

}
