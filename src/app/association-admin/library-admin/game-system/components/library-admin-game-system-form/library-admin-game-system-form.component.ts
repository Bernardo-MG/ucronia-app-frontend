import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameSystem } from '@app/models/library/game-system';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { InputFailureFeedbackComponent } from '@app/shared/form/components/input-failure-feedback/input-failure-feedback.component';
import { SaveControlsComponent } from '@app/shared/form/components/save-controls/save-controls.component';
import { InvalidFieldDirective } from '@bernardo-mg/form';

@Component({
    selector: 'assoc-library-admin-game-system-form',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, SaveControlsComponent, InputFailureFeedbackComponent, InvalidFieldDirective],
    templateUrl: './library-admin-game-system-form.component.html'
})
export class LibraryAdminGameSystemFormComponent extends FormComponent<GameSystem> {

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      name: ['']
    });
  }

}
