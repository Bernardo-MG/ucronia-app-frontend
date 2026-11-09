import { Component, inject, input, Input, OnInit, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { TransactionType } from '@ucronia/domain';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'assoc-transaction-type-form',
  imports: [ReactiveFormsModule, InputTextModule],
  templateUrl: './transaction-type-form.html'
})
export class TransactionTypeForm implements OnInit {

  public readonly form = inject(FormBuilder).nonNullable.group({
    description: ['', [Validators.required, Validators.maxLength(200), Validators.pattern(/\S/)]],
    color: ['#000000', [Validators.required, Validators.pattern(/^#[0-9a-fA-F]{6}$/)]]
  });

  public readonly data = input<TransactionType>();
  public readonly failures = input(new FailureStore());
  public readonly formId = input<string | null>(null);
  @Input() public set loading(loading: boolean) {
    this.formStatus.loading = loading;
  }

  public readonly formStatus = new FormStatus(this.form);
  public readonly save = output<Pick<TransactionType, 'description' | 'color'>>();
  public get saveEnabled(): boolean {
    return this.formStatus.saveEnabled;
  }

  // Lifecycle hooks
  public ngOnInit(): void {
    const data = this.data();
    if (data) {
      this.form.setValue({ description: data.description, color: data.color });
    }
  }

  // Event handlers
  public onSave(): void {
    this.form.markAllAsTouched();
    if (!this.saveEnabled) {
      return;
    }

    const { description, color } = this.form.getRawValue();
    this.save.emit({ description: description.trim(), color });
  }

}
