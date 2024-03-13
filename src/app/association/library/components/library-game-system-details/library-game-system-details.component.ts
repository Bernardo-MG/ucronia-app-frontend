import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FailureResponse } from '@app/core/api/models/failure-response';
import { FieldFailures } from '@app/core/api/models/field-failures';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { throwError } from 'rxjs';
import { BookType } from '../../models/book-type';
import { BookTypeService } from '../../services/book-type.service';
import { LibraryGameSystemFormComponent } from '../library-game-system-form/library-game-system-form.component';
import { LibraryGameSystemInfoComponent } from '../library-game-system-info/library-game-system-info.component';

@Component({
  selector: 'app-library-game-system-details',
  standalone: true,
  imports: [ LayoutModule, LibraryGameSystemFormComponent, LibraryGameSystemInfoComponent ],
  templateUrl: './library-game-system-details.component.html'
})
export class LibraryGameSystemDetailsComponent {

  /**
   * Reading flag.
   */
  public reading = false;

  /**
   * Saving flag.
   */
  public saving = false;

  public editing = false;

  public editable = false;

  public deletable = false;

  public error = false;

  public bookType = new BookType();

  public failures = new FieldFailures();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: BookTypeService,
    private authContainer: AuthContainer
  ) { }

  public ngOnInit(): void {
    // Check permissions
    this.editable = this.authContainer.hasPermission("book_type", "update");
    this.deletable = this.authContainer.hasPermission("book_type", "delete");

    // Get id
    this.route.paramMap.subscribe(params => {
      this.load(params.get('name'));
    });
  }

  public onSave(toSave: BookType): void {
    this.saving = true;
    this.service.update(this.bookType.name, toSave).subscribe({
      next: d => {
        this.bookType = d;

        this.failures = new FieldFailures();
        // Reactivate view
        this.saving = false;
        this.editing = false;
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

  public onDelete(): void {
    this.service.delete(this.bookType.name).subscribe(r => {
      this.router.navigate([`/library`]);
    });
  }

  public onStartEditing(): void {
    this.editing = true;
  }

  public isAbleToEdit() {
    return (!this.error) && (!this.reading) && this.editable && !this.editing;
  }

  public isAbleToDelete() {
    return (!this.error) && (!this.reading) && this.deletable && (!this.editing);
  }

  private load(id: string | null): void {
    if (id) {
      this.reading = true;
      this.service.getOne(id)
        .subscribe({
          next: d => {
            this.bookType = d;
            this.reading = false;
          },
          error: error => {
            this.reading = false;
            this.error = true;
          }
        });
    }
  }

  public isEditable() {
    return this.editable && this.editing && (!this.error);
  }

  public isWaiting() {
    return this.reading || this.saving;
  }

}
