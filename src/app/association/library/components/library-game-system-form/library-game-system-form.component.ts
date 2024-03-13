import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { GameSystem } from '../../models/game-system';

@Component({
  selector: 'library-game-system-form',
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, LayoutModule ],
  templateUrl: './library-game-system-form.component.html'
})
export class LibraryGameSystemFormComponent extends FormComponent<GameSystem> {

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      name: ['']
    });
  }

}
