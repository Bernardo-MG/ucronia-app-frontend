import { Component, inject, Input, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { RecurrenceUnit, ScheduledGame } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'assoc-scheduled-game-form',
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule, FloatLabelModule, DatePickerModule, MessageModule, SelectModule],
  templateUrl: './scheduled-game-form.html'
})
export class ScheduledGameForm implements OnChanges {

  public readonly loading = input(false);
  public readonly failures = input(new FailureStore());
  private readonly fb = inject(FormBuilder);

  @Input() public set data(value: ScheduledGame) {
    this.form.patchValue({
      number: value.number,
      title: value.title,
      description: value.description,
      location: value.location,
      maxPlayers: value.maxPlayers,
      image: value.image,
      day: value.start ?? null,
      startHour: value.start ?? null,
      recurrenceInterval: value.recurrence.interval,
      recurrenceUnit: value.recurrence.unit,
      master: value.master
    });
  }

  public readonly save = output<ScheduledGame>();

  public formStatus: FormStatus;
  public form: FormGroup;

  public readonly recurrenceUnits = [
    { name: 'Diaria', value: RecurrenceUnit.DAILY },
    { name: 'Semanal', value: RecurrenceUnit.WEEKLY },
    { name: 'Mensual', value: RecurrenceUnit.MONTHLY }
  ];

  constructor() {
    this.form = this.fb.group({
      number: [null],
      title: [null, Validators.required],
      description: [''],
      location: [''],
      maxPlayers: [0, [Validators.required, Validators.min(1)]],
      image: [''],
      day: [null, Validators.required],
      startHour: [null, Validators.required],
      recurrenceInterval: [0, [Validators.required, Validators.min(0)]],
      recurrenceUnit: [RecurrenceUnit.WEEKLY, Validators.required],
      master: [null]
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

    this.save.emit({
      number: value.number ?? 0,
      title: value.title,
      description: value.description ?? '',
      location: value.location ?? '',
      maxPlayers: Number(value.maxPlayers ?? 0),
      image: value.image ?? '',
      start: this.mergeDayAndTime(value.day, value.startHour),
      recurrence: {
        interval: Number(value.recurrenceInterval ?? 0),
        unit: value.recurrenceUnit
      },
      master: value.master ?? {
        number: 0,
        firstName: '',
        lastName: ''
      },
      published: false
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
