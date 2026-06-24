import { Component, inject, Input, input, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { Activity } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'assoc-activity-form',
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule, FloatLabelModule, DatePickerModule, MessageModule, InputGroupModule, InputGroupAddonModule],
  templateUrl: './activity-form.html'
})
export class ActivityForm {
  public readonly loading = input(false);
  public readonly failures = input(new FailureStore());

  @Input() public set data(value: Activity) {
    this.form.patchValue({
      number: value.number,
      title: value.title,
      description: value.description,
      location: value.location,
      image: value.image,
      day: value.start,
      startHour: value.start,
      endHour: value.end
    });
  }

  public readonly save = output<Activity>();

  public formStatus: FormStatus;
  public form: FormGroup;

  constructor() {
    const fb = inject(FormBuilder);

    this.form = fb.group({
      number: [null],
      day: [null, Validators.required],
      startHour: [null, Validators.required],
      endHour: [null, Validators.required],
      title: [null, Validators.required],
      description: [''],
      location: [''],
      image: ['']
    });

    this.formStatus = new FormStatus(this.form);
  }

  public ngOnChanges({ loading }: SimpleChanges): void {
    if (loading) {
      this.formStatus.loading = this.loading();
    }
  }

  public onSave(): void {
    if (!this.formStatus.saveEnabled) {
      return;
    }

    const value = this.form.value;

    const start = this.mergeDayAndTime(value.day, value.startHour);
    const end = this.mergeDayAndTime(value.day, value.endHour);

    this.save.emit({
      number: value.number ?? 0,
      title: value.title,
      description: value.description ?? '',
      location: value.location ?? '',
      image: value.image ?? '',
      start,
      end
    });
  }

  private mergeDayAndTime(day: Date, time: Date): Date {
    const result = new Date(day);
    result.setHours(time.getHours(), time.getMinutes(), 0, 0);
    return result;
  }

  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || this.failures().hasFailures(property);
  }
}
