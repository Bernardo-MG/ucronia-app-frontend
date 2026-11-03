import { Component, inject, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UcroniaClient } from '@ucronia/api';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { InputTextModule } from 'primeng/inputtext';
import { finalize } from 'rxjs';

@Component({
  selector: 'assoc-transaction-type-form',
  imports: [ReactiveFormsModule, ButtonModule, DrawerModule, InputTextModule],
  templateUrl: './transaction-type-form.html'
})
export class TransactionTypeForm {
  private readonly client = inject(UcroniaClient);
  private readonly messages = inject(MessageService);
  private readonly untilDestroyed = takeUntilDestroyed();

  public readonly created = output<void>();
  public readonly closed = output<void>();
  public readonly form = inject(FormBuilder).nonNullable.group({
    description: ['', [Validators.required, Validators.maxLength(200), Validators.pattern(/\S/)]],
    color: ['#000000', [Validators.required, Validators.pattern(/^#[0-9a-fA-F]{6}$/)]]
  });

  public saving = false;
  public failed = false;

  public save(): void {
    if (this.saving || this.form.invalid) {
      return;
    }

    const { description, color } = this.form.getRawValue();
    this.saving = true;
    this.failed = false;
    this.client.transactionType.create({ description: description.trim(), color })
      .pipe(this.untilDestroyed, finalize(() => this.saving = false))
      .subscribe({
        next: () => {
          this.messages.add({ severity: 'info', summary: 'Tipo de transacción creado', life: 3000 });
          this.created.emit();
          this.closed.emit();
        },
        error: () => this.failed = true
      });
  }
}
