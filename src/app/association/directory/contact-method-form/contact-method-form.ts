import { Component, inject, Input, input, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { ContactMethod } from "@ucronia/domain";
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'assoc-contact-method-form',
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule, InputGroupModule, InputGroupAddonModule, MessageModule],
  templateUrl: './contact-method-form.html'
})
export class ContactMethodForm {

  public readonly loading = input(false);
  public readonly failures = input(new FailureStore());

  @Input() public set data(value: ContactMethod) {
    this.form.patchValue(value as any);
  }

  public readonly save = output<ContactMethod>();

  public formStatus: FormStatus;
  public form: FormGroup;

  constructor() {
    const fb = inject(FormBuilder);

    this.form = fb.group({
      number: [null],
      name: [null, Validators.required]
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
      // Valid form, can emit data
      this.save.emit(this.form.value);
    }
  }

  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || (this.failures().hasFailures(property));
  }

}
