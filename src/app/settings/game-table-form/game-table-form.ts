import { Component, inject, Input, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DrawerFormActions } from '@app/shared/ui/drawer-form-actions/drawer-form-actions';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { GameTable } from '@ucronia/domain';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'assoc-game-table-form',
  imports: [DrawerFormActions, ReactiveFormsModule, InputTextModule, MessageModule, TextareaModule],
  templateUrl: './game-table-form.html'
})
export class GameTableForm {
  public readonly cancelEdition = output<void>();

  public readonly formId = input<string | null>(null);
  public readonly showActions = input(true);

  @Input() public set loading(loading: boolean) {
    this.formStatus.loading = loading;
  }

  public readonly failures = input(new FailureStore());
  @Input() public set data(value: GameTable) {
    this.form.patchValue(value);
    this.isEdit = true;
  }

  public isEdit = false;

  public readonly save = output<GameTable>();

  public readonly form: FormGroup;
  public readonly formStatus: FormStatus;

  public get saveEnabled(): boolean {
    return this.formStatus.saveEnabled;
  }

  constructor() {
    const fb = inject(FormBuilder);
    this.form = fb.group({
      number: [null],
      name: [null, Validators.required],
      description: [null, Validators.required]
    });
    this.formStatus = new FormStatus(this.form);
  }

  public onSave(): void {
    this.form.markAllAsTouched();

    if (this.saveEnabled) {
      this.save.emit(this.form.value);
    }
  }

  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || this.failures().hasFailures(property);
  }

}
