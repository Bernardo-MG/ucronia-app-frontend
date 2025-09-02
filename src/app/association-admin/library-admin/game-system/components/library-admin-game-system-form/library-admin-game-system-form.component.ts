
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameSystem } from '@app/domain/library/game-system';
import { FormComponent } from '@bernardo-mg/form';
import { JustifyBetweenDirective } from '@bernardo-mg/ui';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'assoc-library-admin-game-system-form',
  imports: [FormsModule, ReactiveFormsModule, InputTextModule, FloatLabelModule, MessageModule, ButtonModule, JustifyBetweenDirective],
  templateUrl: './library-admin-game-system-form.component.html'
})
export class LibraryAdminGameSystemFormComponent extends FormComponent<GameSystem> {

  constructor() {
    super();

    const fb = inject(FormBuilder);

    this.form = fb.group({
      number: [],
      name: ['']
    });
  }

}
