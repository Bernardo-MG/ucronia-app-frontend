import { Component, inject, Input, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { GameTable } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'assoc-game-table-form',
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, MessageModule, TextareaModule],
  templateUrl: './game-table-form.html'
})
export class GameTableForm implements OnChanges {
  public readonly loading = input(false);
  public readonly failures = input(new FailureStore());
  @Input() public set data(value: GameTable) {
    this.form.patchValue(value);
  }

  public readonly save = output<GameTable>();

  public readonly form: FormGroup;
  public readonly formStatus: FormStatus;

  constructor() {
    const fb = inject(FormBuilder);
    this.form = fb.group({
      number: [null],
      name: [null, Validators.required],
      description: [null, Validators.required]
    });
    this.formStatus = new FormStatus(this.form);
  }

  public ngOnChanges({ loading }: SimpleChanges): void {
    if (loading) this.formStatus.loading = this.loading();
  }

  public submit(): void {
    if (this.formStatus.saveEnabled) {
      this.save.emit(this.form.value);
    }
  }

  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || this.failures().hasFailures(property);
  }
}
