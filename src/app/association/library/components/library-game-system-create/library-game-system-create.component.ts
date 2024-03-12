import { Component } from '@angular/core';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { LibraryGameSystemCreateFormComponent } from '../library-game-system-create-form/library-game-system-create-form.component';
import { Router } from '@angular/router';
import { FailureResponse } from '@app/core/api/models/failure-response';
import { FieldFailures } from '@app/core/api/models/field-failures';
import { throwError } from 'rxjs';
import { GameSystem } from '../../models/game-system';
import { GameSystemService } from '../../services/game-system.service';

@Component({
  selector: 'app-library-game-system-create',
  standalone: true,
  imports: [ LayoutModule, LibraryGameSystemCreateFormComponent ],
  templateUrl: './library-game-system-create.component.html'
})
export class LibraryGameSystemCreateComponent {

  /**
   * Loading flag.
   */
  public saving = false;

  public failures = new FieldFailures();

  constructor(
    private service: GameSystemService,
    private router: Router
  ) { }

  public onSave(data: GameSystem): void {
    this.saving = true;
    this.service.create(data).subscribe({
      next: d => {
        this.router.navigate([`/library/gameSystem/${d.name}`]);
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
