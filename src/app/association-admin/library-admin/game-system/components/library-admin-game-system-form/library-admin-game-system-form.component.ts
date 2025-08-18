
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameSystem } from '@app/domain/library/game-system';
import { FormComponent, InputFailureFeedbackComponent, InvalidFieldDirective, SaveControlsComponent } from '@bernardo-mg/form';

@Component({
  selector: 'assoc-library-admin-game-system-form',
  imports: [FormsModule, ReactiveFormsModule, SaveControlsComponent, InputFailureFeedbackComponent, InvalidFieldDirective],
  templateUrl: './library-admin-game-system-form.component.html'
})
export class LibraryAdminGameSystemFormComponent extends FormComponent<GameSystem> {

  constructor() {
    const fb = inject(FormBuilder);

    super();

    this.form = fb.group({
      name: ['']
    });
  }

}
