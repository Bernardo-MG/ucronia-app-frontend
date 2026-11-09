import { Component, inject, Input, input, output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { Activity } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ImageContent } from '../../images/image-content/image-content';

@Component({
  selector: 'assoc-activity-form',
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, DatePickerModule, ImageContent,
    MessageModule, SelectModule, TextareaModule],
  templateUrl: './activity-form.html'
})
export class ActivityForm {

  private readonly fb = inject(FormBuilder);

  @Input() public set data(value: Activity) {
    this.form.patchValue({
      number: value.number,
      title: value.title,
      description: value.description,
      location: value.location,
      image: value.image
    });
    this.showImageField = !!value.image;

    this.dates.clear();

    for (const date of value.dates ?? []) {
      this.dates.push(this.createDateGroup(date.start, date.end));
    }

    if (this.dates.length === 0) {
      this.addDate();
    }
  }
  public readonly failures = input(new FailureStore());
  public readonly formId = input<string | null>(null);
  public readonly imageOptions = input<ActivityImageOption[]>([]);
  @Input() public set loading(loading: boolean) {
    this.formStatus.loading = loading;
  }

  public readonly save = output<Activity>();

  public get dates(): FormArray {
    return this.form.get('dates') as FormArray;
  }
  public readonly form: FormGroup;
  public readonly formStatus: FormStatus;
  public get saveEnabled(): boolean {
    return this.formStatus.saveEnabled;
  }

  protected showImageField = false;

  public constructor() {
    this.form = this.fb.group({
      number: [null],
      title: [null, Validators.required],
      description: [''],
      location: [''],
      image: [''],
      dates: this.fb.array([])
    });

    this.formStatus = new FormStatus(this.form);
    this.addDate();
  }

  // Event handlers
  protected addDate(): void {
    this.dates.push(this.createDateGroup());
  }

  public onSave(): void {
    this.form.markAllAsTouched();

    if (this.saveEnabled) {
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
  }

  // Protected methods
  protected isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || this.failures().hasFailures(property);
  }

  protected removeDate(index: number): void {
    this.dates.removeAt(index);
  }

  // Private methods
  private createDateGroup(start?: Date, end?: Date): FormGroup {
    return this.fb.group({
      day: [start ?? null, Validators.required],
      startHour: [start ?? null, Validators.required],
      endHour: [end ?? null, Validators.required]
    });
  }

  private mergeDayAndTime(day: Date, time: Date): Date {
    const result = new Date(day);
    result.setHours(time.getHours(), time.getMinutes(), 0, 0);
    return result;
  }

}

export interface ActivityImageOption {
  name: string;
  description: string;
  number: number;
  url: string;
}
