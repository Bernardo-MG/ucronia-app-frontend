
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormComponent } from '@bernardo-mg/form';
import { JustifyBetweenDirective } from '@bernardo-mg/ui';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { NameNumber } from '../model/name-number';

@Component({
  selector: 'shared-name-form',
  imports: [FormsModule, ReactiveFormsModule, InputTextModule, FloatLabelModule, MessageModule, ButtonModule, JustifyBetweenDirective],
  templateUrl: './name-form.html'
})
export class NameForm extends FormComponent<NameNumber> {

  constructor() {
    super();

    const fb = inject(FormBuilder);

    this.form = fb.group({
      number: [],
      name: ['', Validators.required]
    });
  }

}
