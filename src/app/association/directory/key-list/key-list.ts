import { Component, inject, input, output } from '@angular/core';
import { Key } from '@ucronia/domain';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'assoc-key-list',
  imports: [ButtonModule, TableModule, TagModule],
  templateUrl: './key-list.html'
})
export class KeyList {

  private readonly confirmationService = inject(ConfirmationService);

  public readonly loading = input(false);
  public readonly editable = input(false);
  public readonly deletable = input(false);
  public readonly data = input<Key[]>([]);

  public readonly edit = output<Key>();
  public readonly delete = output<number>();

  public confirmDelete(event: Event, key: Key) {
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: '¿Estas seguro de querer borrar? Esta accion no es revertible',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Borrar',
        severity: 'danger'
      },
      accept: () => this.delete.emit(key.number)
    });
  }

}
