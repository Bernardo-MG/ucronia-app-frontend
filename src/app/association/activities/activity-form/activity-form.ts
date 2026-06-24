import { Component, inject, Input, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
export class ActivityForm implements OnChanges {
  public readonly loading = input(false);
  public readonly failures = input(new FailureStore());

  @Input() public set data(value: Activity) {
    this.form.patchValue({
      number: value.number,
      title: value.title,
      description: value.description,
      location: value.location,
      image: value.image
    });

    this.dates.clear();

    for (const date of value.dates ?? []) {
      this.dates.push(this.createDateGroup(date.start, date.end));
    }

    if (this.dates.length === 0) {
      this.addDate();
    }
  }

  public readonly save = output<Activity>();

  public formStatus: FormStatus;
  public form: FormGroup;

  constructor() {
    const fb = inject(FormBuilder);

    this.form = fb.group({
      number: [null],
      title: [null, Validators.required],
      description: [''],
      location: [''],
      image: [''],
      dates: fb.array([])
    });

    this.formStatus = new FormStatus(this.form);
    this.addDate();
  }

  public ngOnChanges({ loading }: SimpleChanges): void {
    if (loading) {
      this.formStatus.loading = this.loading();
    }
  }

  public get dates(): FormArray {
    return this.form.get('dates') as FormArray;
  }

  private createDateGroup(start?: Date, end?: Date): FormGroup {
    const fb = inject(FormBuilder);

    return fb.group({
      day: [start ?? null, Validators.required],
      startHour: [start ?? null, Validators.required],
      endHour: [end ?? null, Validators.required]
    });
  }

  public addDate(): void {
    this.dates.push(this.createDateGroup());
  }

  public removeDate(index: number): void {
    this.dates.removeAt(index);
  }

  public onSave(): void {
    if (!this.formStatus.saveEnabled) {
      return;
    }

    const value = this.form.value;

    this.save.emit({
      number: value.number ?? 0,
      title: value.title,
      description: value.description ?? '',
      location: value.location ?? '',
      image: value.image ?? '',
      dates: value.dates.map((date: any) => ({
        start: this.mergeDayAndTime(date.day, date.startHour),
        end: this.mergeDayAndTime(date.day, date.endHour)
      }))
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
