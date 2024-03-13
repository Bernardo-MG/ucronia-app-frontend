import { Component } from '@angular/core';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { LibraryBookFormComponent } from '../library-book-form/library-book-form.component';
import { Router } from '@angular/router';
import { FailureResponse } from '@app/core/api/models/failure-response';
import { FieldFailures } from '@app/core/api/models/field-failures';
import { throwError } from 'rxjs';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-library-book-create',
  standalone: true,
  imports: [ LayoutModule, LibraryBookFormComponent ],
  templateUrl: './library-book-create.component.html'
})
export class LibraryBookCreateComponent {

  /**
   * Loading flag.
   */
  public saving = false;

  public failures = new FieldFailures();

  constructor(
    private service: BookService,
    private router: Router
  ) { }

  public onSave(data: Book): void {
    this.saving = true;
    this.service.create(data).subscribe({
      next: d => {
        this.router.navigate([`/library/book/${d.isbn}`]);
        this.failures = new FieldFailures();
        // Reactivate view
        this.saving = false;
      },
      error: error => {
        if (error instanceof FailureResponse) {
          this.failures = error.failures;
        } else {
          this.failures = new FieldFailures();
        }
        // Reactivate view
        this.saving = false;

        return throwError(() => error);
      }
    });
  }

}
