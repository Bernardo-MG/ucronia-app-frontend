import { Component, inject, input, OnInit, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UcroniaClient } from '@ucronia/api';
import { TransactionType } from '@ucronia/domain';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { InputTextModule } from 'primeng/inputtext';
import { finalize, Observable } from 'rxjs';

@Component({
  selector: 'assoc-transaction-type-form',
  imports: [ReactiveFormsModule, ButtonModule, DrawerModule, InputTextModule],
  templateUrl: './transaction-type-form.html'
})
export class TransactionTypeForm implements OnInit {
  private readonly client = inject(UcroniaClient);
  private readonly messages = inject(MessageService);
  private readonly untilDestroyed = takeUntilDestroyed<TransactionType>();

  public readonly data = input<TransactionType>();
  public readonly updated = output<TransactionType>();
  public readonly created = output<void>();
  public readonly closed = output<void>();
  public readonly form = inject(FormBuilder).nonNullable.group({
    description: ['', [Validators.required, Validators.maxLength(200), Validators.pattern(/\S/)]],
    color: ['#000000', [Validators.required, Validators.pattern(/^#[0-9a-fA-F]{6}$/)]]
  });

  public saving = false;
  public failed = false;

  public ngOnInit(): void {
    const data = this.data();
    if (data) {
      this.form.setValue({ description: data.description, color: data.color });
    }
  }

  public save(): void {
    if (this.saving || this.form.invalid) {
      return;
    }

    const { description, color } = this.form.getRawValue();
    this.saving = true;
    this.failed = false;
    const data = this.data();
    const values = { description: description.trim(), color };
    const endpoint = this.client.transactionType;
    const request: Observable<TransactionType> = data ? endpoint.update(data.number, values) : endpoint.create(values);

    request
      .pipe(this.untilDestroyed, finalize(() => this.saving = false))
      .subscribe({
        next: saved => {
          this.messages.add({
            severity: 'info',
            summary: data ? 'Tipo de transacción actualizado' : 'Tipo de transacción creado',
            life: 3000
          });
          if (data) {
            this.updated.emit(saved);
          } else {
            this.created.emit();
          }
          this.closed.emit();
        },
        error: () => this.failed = true
      });
  }
}
