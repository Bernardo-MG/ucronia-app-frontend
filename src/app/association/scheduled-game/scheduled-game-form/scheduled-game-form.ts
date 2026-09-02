import { Component, inject, Input, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MemberSearch, MemberSearchEvent } from '@app/shared/member/member-search/member-search';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { Profile, RecurrenceUnit, ScheduledGame, ScheduledGameType } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'assoc-scheduled-game-form',
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, DatePickerModule, InputNumberModule, InputTextModule,
    MessageModule, SelectModule, TextareaModule, ToggleSwitchModule, MemberSearch],
  templateUrl: './scheduled-game-form.html'
})
export class ScheduledGameForm implements OnChanges {

  private readonly fb = inject(FormBuilder);

  public readonly loading = input(false);
  public readonly failures = input(new FailureStore());
  public readonly members = input<Profile[]>([]);
  public readonly selectedMaster = input(new Profile());

  @Input() public set data(value: ScheduledGame) {
    this.form.patchValue(value as any);
    this.recurring = value.recurrence ? value.recurrence?.interval > 0 : false;
    this.showImageField = !!value.image;
  }

  public readonly save = output<ScheduledGame>();
  public readonly cancelEdition = output<void>();
  public readonly searchMember = output<MemberSearchEvent>();

  public formStatus: FormStatus;
  public form: FormGroup;
  public master = new Profile();
  public recurring = false;
  public showImageField = false;

  public readonly recurrenceUnits = [
    { name: 'Diaria', value: RecurrenceUnit.DAILY },
    { name: 'Semanal', value: RecurrenceUnit.WEEKLY },
    { name: 'Mensual', value: RecurrenceUnit.MONTHLY }
  ];

  public readonly gameTypes = [
    { name: 'Campaña', value: ScheduledGameType.CAMPAIGN },
    { name: 'Partida única', value: ScheduledGameType.ONESHOT }
  ];

  constructor() {
    this.form = this.fb.group({
      number: [null],
      title: [null, Validators.required],
      gameType: [ScheduledGameType.ONESHOT, Validators.required],
      description: [''],
      location: [''],
      maxPlayers: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
      image: [''],
      start: [null, Validators.required],
      recurrence: this.fb.group({
        interval: [0, [Validators.required, Validators.min(0), Validators.max(365)]],
        unit: [RecurrenceUnit.WEEKLY, Validators.required]
      }),
      master: [null, Validators.required]
    });

    this.formStatus = new FormStatus(this.form);
  }

  public ngOnChanges({ loading, selectedMaster }: SimpleChanges): void {
    if (loading) {
      this.formStatus.loading = this.loading();
    }

    if (selectedMaster && this.selectedMaster().number) {
      this.master = this.selectedMaster();
      this.form.get('master')?.setValue(this.master.number);
    }
  }

  public onSave(): void {
    if (!this.formStatus.saveEnabled) {
      return;
    }

    if (!this.recurring) {
      this.form.get('recurrence.interval')?.setValue(0);
    }

    this.save.emit(this.form.value);
  }

  public onSelectMaster(member: Profile): void {
    this.master = member;
    this.form.get('master')?.setValue(member.number);
    this.form.get('master')?.markAsDirty();
  }

  public clearMaster(): void {
    this.master = new Profile();
    this.form.get('master')?.reset();
    this.form.get('master')?.markAsTouched();
  }

  public onRecurrenceChange(recurring: boolean): void {
    const interval = this.form.get('recurrence.interval');

    if (recurring && Number(interval?.value) < 1) {
      interval?.setValue(1);
    }

    if (!recurring) {
      interval?.setValue(0);
    }
  }

  public getInitials(profile: Profile): string {
    return profile.name.fullName
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(part => part.charAt(0).toUpperCase())
      .join('');
  }

  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || this.failures().hasFailures(property);
  }

}