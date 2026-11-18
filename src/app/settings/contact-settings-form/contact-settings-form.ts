import { Component, inject, input, OnChanges, output, SimpleChanges, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormStatus } from '@bernardo-mg/form';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'assoc-contact-settings-form',
  imports: [ButtonModule, ReactiveFormsModule, InputTextModule, IconFieldModule, InputIconModule],
  templateUrl: './contact-settings-form.html'
})
export class ContactSettingsForm implements OnChanges {

  public readonly email = input('');
  public readonly googleMaps = input('');
  public readonly instagram = input('');
  @Input() public set loading(loading: boolean) {
    this.formStatus.loading = loading;
  }
  public readonly teamUp = input('');
  public readonly telegram = input('');

  public readonly save = output<SocialSettingsFormEvent>();

  /**
   * Form structure.
   */
  public readonly form: FormGroup;
  public readonly formStatus: FormStatus;
  public get saveEnabled(): boolean {
    return this.formStatus.saveEnabled;
  }

  public constructor() {
    const formBuilder = inject(FormBuilder);

    this.form = formBuilder.nonNullable.group({
      email: [''],
      instagram: [''],
      googleMaps: [''],
      teamUp: [''],
      telegram: ['']
    });

    this.formStatus = new FormStatus(this.form);
  }

  // Lifecycle hooks
  public ngOnChanges({ email, instagram, googleMaps, teamUp, telegram }: SimpleChanges): void {
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
    if (telegram) {
      this.form.get('telegram')?.setValue(telegram.currentValue);
    }
  }

  // Event handlers
  /**
   * Handler for the save event.
   */
  public onSave(): void {
    this.form.markAllAsTouched();
    if (this.saveEnabled) {
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
    public teamUp?: string,
    public telegram?: string
  ) { }
}
