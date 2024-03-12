import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { GameSystem } from '../../models/game-system';

@Component({
  selector: 'library-game-system-create-form',
  standalone: true,
  imports: [],
  templateUrl: './library-game-system-create-form.component.html'
})
export class LibraryGameSystemCreateFormComponent extends FormComponent<GameSystem> {

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      name: ['']
    });
  }

}
