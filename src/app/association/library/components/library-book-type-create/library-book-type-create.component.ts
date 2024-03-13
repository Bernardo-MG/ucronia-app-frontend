import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FailureResponse } from '@app/core/api/models/failure-response';
import { FieldFailures } from '@app/core/api/models/field-failures';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { throwError } from 'rxjs';
import { BookType } from '../../models/book-type';
import { BookTypeService } from '../../services/book-type.service';
import { LibraryBookTypeFormComponent } from '../library-book-type-form/library-book-type-form.component';

@Component({
  selector: 'app-library-book-type-create',
  standalone: true,
  imports: [ LayoutModule, LibraryBookTypeFormComponent ],
  templateUrl: './library-book-type-create.component.html'
})
export class LibraryBookTypeCreateComponent {

  /**
   * Loading flag.
   */
  public saving = false;

  public failures = new FieldFailures();

  constructor(
    private service: BookTypeService,
    private router: Router
  ) { }

  public onSave(data: BookType): void {
    this.saving = true;
    this.service.create(data).subscribe({
      next: d => {
        this.router.navigate([`/library/bookType/${d.name}`]);
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
