import { Component, inject, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormStatus } from '@bernardo-mg/form';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'assoc-contact-settings-form',
  imports: [FormsModule, ReactiveFormsModule, InputTextModule, FloatLabelModule, IconFieldModule, InputIconModule, ButtonModule],
  templateUrl: './contact-settings-form.html'
})
export class ContactSettingsForm implements OnChanges {

  public readonly email = input('');
  public readonly instagram = input('');
  public readonly googleMaps = input('');
  public readonly teamUp = input('');
  public readonly loading = input(false);

  public readonly save = output<SocialSettingsFormEvent>();

  public formStatus: FormStatus;

  /**
   * Form structure.
   */
  public form: FormGroup;

  constructor() {
    const formBuilder = inject(FormBuilder);

    this.form = formBuilder.nonNullable.group({
      email: [''],
      instagram: [''],
      googleMaps: [''],
      teamUp: ['']
    });

    this.formStatus = new FormStatus(this.form);
  }

  public ngOnChanges({ loading, email, instagram, googleMaps, teamUp }: SimpleChanges): void {
    if (loading) {
      this.formStatus.loading = loading.currentValue;
    }
    if (instagram) {
      this.form.get('instagram')?.setValue(instagram.currentValue);
    }
    if (email) {
      this.form.get('email')?.setValue(email.currentValue);
    }
    if (googleMaps) {
      this.form.get('googleMaps')?.setValue(googleMaps.currentValue);
    }
    if (teamUp) {
      this.form.get('teamUp')?.setValue(teamUp.currentValue);
    }
  }

  /**
   * Handler for the save event.
   */
  public onSave() {
    if (this.form.valid) {
      const changedValues: any = {};

      Object.entries(this.form.controls).forEach(([key, control]) => {
        if (control.dirty) {
          changedValues[key] = control.value;
        }
      });

      if (Object.keys(changedValues).length > 0) {
        this.save.emit(changedValues);
      }
    }
  }

}

export class SocialSettingsFormEvent {
  constructor(
    public instagram?: string,
    public email?: string,
    public googleMaps?: string,
    public teamUp?: string
  ) { }
}
