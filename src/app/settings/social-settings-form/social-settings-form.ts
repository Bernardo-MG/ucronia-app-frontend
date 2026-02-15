import { Component, inject, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormStatus } from '@bernardo-mg/form';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'assoc-social-settings-form',
  imports: [FormsModule, ReactiveFormsModule, InputTextModule, FloatLabelModule, IconFieldModule, InputIconModule, ButtonModule],
  templateUrl: './social-settings-form.html'
})
export class SocialSettingsForm implements OnChanges {

  public readonly googleMaps = input('');
  public readonly teamUp = input('');
  public readonly instagram = input('');
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
      googleMaps: [''],
      teamUp: [''],
      instagram: ['']
    });

    this.formStatus = new FormStatus(this.form);
  }

  public ngOnChanges({ loading, googleMaps, teamUp, instagram }: SimpleChanges): void {
    if (loading) {
      this.formStatus.loading = this.loading();
    }
    if (googleMaps) {
      this.form.get('googleMaps')?.setValue(googleMaps.currentValue);
    }
    if (teamUp) {
      this.form.get('teamUp')?.setValue(teamUp.currentValue);
    }
    if (instagram) {
      this.form.get('instagram')?.setValue(instagram.currentValue);
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

}

export class SocialSettingsFormEvent {
  constructor(
    public googleMaps: string,
    public teamUp: string,
    public instagram: string
  ) {
  }
}
