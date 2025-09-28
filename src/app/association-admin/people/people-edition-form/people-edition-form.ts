
import { Component, inject, Input, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Person } from '@app/domain/person/person';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'assoc-people-edition-form',
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule, FloatLabelModule, DatePickerModule, MessageModule],
  templateUrl: './people-edition-form.html'
})
export class PeopleEditionForm implements OnChanges {

  public readonly loading = input(false);

  public readonly failures = input(new FailureStore());

  @Input() public set data(value: Person) {
    this.form.patchValue(value as any);
  }

  public readonly save = output<Person>();

  public formStatus: FormStatus;

  public form: FormGroup;

  constructor() {
    const fb = inject(FormBuilder);

    this.form = fb.group({
      number: [-1],
      name: fb.group({
        firstName: [null],
        lastName: ['']
      }),
      identifier: [''],
      birthDate: [new Date()],
      phone: [''],
      membership: fb.group({
        active: [false],
        renew: [false]
      })
    });

    this.formStatus = new FormStatus(this.form);
  }

  public ngOnChanges({ loading }: SimpleChanges): void {
    if (loading) {
      this.formStatus.loading = this.loading();
    }
  }

  /**
   * Handler for the save event.
   */
  public onSave() {
    if (this.form.valid) {
      // Valid form, can emit data
      this.save.emit(this.form.value);
    }
  }

  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || (this.failures().hasFailures(property));
  }

}
