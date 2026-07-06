import { Component, inject, Input, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MemberSearch, MemberSearchEvent } from '@app/shared/member/member-search/member-search';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { PublicMember, RecurrenceUnit, ScheduledGame } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'assoc-scheduled-game-form',
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule, FloatLabelModule, DatePickerModule, MessageModule, SelectModule, MemberSearch],
  templateUrl: './scheduled-game-form.html'
})
export class ScheduledGameForm implements OnChanges {

  private readonly fb = inject(FormBuilder);

  public readonly loading = input(false);
  public readonly failures = input(new FailureStore());
  public readonly members = input<PublicMember[]>([]);

  @Input() public set data(value: ScheduledGame) {
    this.selectedMaster = value.master;
    this.form.patchValue(value as any);
  }

  public readonly save = output<ScheduledGame>();
  public readonly searchMember = output<MemberSearchEvent>();

  public formStatus: FormStatus;
  public form: FormGroup;
  public selectedMaster = new PublicMember();

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
      maxPlayers: [null, [Validators.required, Validators.min(1)]],
      image: [''],
      start: [null, Validators.required],
      recurrence: this.fb.group({
        interval: [0, [Validators.required, Validators.min(0)]],
        unit: [RecurrenceUnit.WEEKLY, Validators.required]
      }),
      master: this.fb.group({
        number: [null, Validators.required]
      }),
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

    this.save.emit(this.form.value);
  }

  public onSelectMember(member: PublicMember): void {
    if (!member) {
      return;
    }

    this.form.get('master')?.setValue(member);
  }

  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || this.failures().hasFailures(property);
  }

}
