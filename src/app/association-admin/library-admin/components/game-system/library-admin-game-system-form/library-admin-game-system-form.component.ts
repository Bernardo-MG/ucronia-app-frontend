import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GameSystem } from '@app/association/library/models/game-system';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { SaveControlsComponent } from '@app/shared/form/components/save-controls/save-controls.component';
import { FormModule } from '@app/shared/form/form.module';

@Component({
  selector: 'assoc-library-admin-game-system-form',
  standalone: true,
  imports: [ CommonModule, FormModule, SaveControlsComponent ],
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
