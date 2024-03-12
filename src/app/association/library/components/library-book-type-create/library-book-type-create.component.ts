import { Component } from '@angular/core';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { LibraryBookTypeCreateFormComponent } from '../library-book-type-create-form/library-book-type-create-form.component';
import { Router } from '@angular/router';
import { Member } from '@app/association/members/models/member';
import { MemberService } from '@app/association/members/services/member.service';
import { FailureResponse } from '@app/core/api/models/failure-response';
import { FieldFailures } from '@app/core/api/models/field-failures';
import { throwError } from 'rxjs';
import { BookTypeService } from '../../services/book-type.service';
import { BookType } from '../../models/book-type';

@Component({
  selector: 'app-library-book-type-create',
  standalone: true,
  imports: [ LayoutModule, LibraryBookTypeCreateFormComponent ],
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
