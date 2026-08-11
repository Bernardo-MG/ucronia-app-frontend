import { Component, inject, input, Input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { Key } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'assoc-key-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputNumberModule,
    ToggleSwitchModule,
    MessageModule
  ],
  templateUrl: './key-form.html'
})
export class KeyForm implements OnChanges {

  public readonly loading = input(false);
  public readonly failures = input(new FailureStore());

  @Input() public set data(value: Key | undefined) {
    if (value) {
      this.form.patchValue(value as any);
      this.isEdit = true;
    } else {
      this.form.reset({ number: null, missing: false, description: '' });
      this.isEdit = false;
    }
  }

  public readonly save = output<Key>();

  public formStatus: FormStatus;
  public form: FormGroup;

  public isEdit = false;

  constructor() {
    const fb = inject(FormBuilder);

    this.form = fb.group({
      number: [null, Validators.required],
      missing: [false],
      description: ['']
    });

    this.formStatus = new FormStatus(this.form);
  }

  public ngOnChanges({ loading }: SimpleChanges): void {
    if (loading) {
      this.formStatus.loading = this.loading();
    }
  }

  public submit() {
    if (this.form.valid) {
      this.save.emit(this.form.value);
    }
  }

  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || this.failures().hasFailures(property);
  }

}
