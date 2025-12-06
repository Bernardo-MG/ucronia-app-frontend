import { Component, inject, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormStatus } from '@bernardo-mg/form';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'assoc-third-party-settings-form',
  imports: [FormsModule, ReactiveFormsModule, InputTextModule, FloatLabelModule, IconFieldModule, InputIconModule, ButtonModule],
  templateUrl: './third-party-settings-form.html'
})
export class ThirdPartySettingsForm implements OnChanges {

  public readonly googleMaps = input('');
  public readonly teamUp = input('');
  public readonly loading = input(false);

  public readonly save = output<{ googleMaps: string, teamUp: string }>();

  public formStatus: FormStatus;

  /**
   * Form structure.
   */
  public form: FormGroup;

  constructor() {
    const formBuilder = inject(FormBuilder);

    this.form = formBuilder.nonNullable.group({
      googleMaps: [''],
      teamUp: ['']
    });

    this.formStatus = new FormStatus(this.form);
  }

  public ngOnChanges({ loading, googleMaps, teamUp }: SimpleChanges): void {
    if (loading) {
      this.formStatus.loading = this.loading();
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
      // Valid form, can emit data
      this.save.emit(this.form.value);
    }
  }

}
