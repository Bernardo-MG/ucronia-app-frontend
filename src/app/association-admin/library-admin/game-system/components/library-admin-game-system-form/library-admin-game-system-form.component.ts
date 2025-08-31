
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameSystem } from '@app/domain/library/game-system';
import { FormComponent, SaveControlsComponent } from '@bernardo-mg/form';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'assoc-library-admin-game-system-form',
  imports: [FormsModule, ReactiveFormsModule, SaveControlsComponent, InputTextModule, FloatLabelModule, MessageModule],
  templateUrl: './library-admin-game-system-form.component.html'
})
export class LibraryAdminGameSystemFormComponent extends FormComponent<GameSystem> {

  constructor() {
    super();

    const fb = inject(FormBuilder);

    this.form = fb.group({
      name: ['']
    });
  }

}
