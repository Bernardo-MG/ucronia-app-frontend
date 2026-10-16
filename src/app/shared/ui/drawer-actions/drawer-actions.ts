import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'shared-drawer-actions',
  imports: [ButtonModule],
  templateUrl: './drawer-actions.html',
  host: { class: 'block w-full' }
})
export class DrawerActions {
  public readonly showDelete = input(true);
  public readonly showEdit = input(true);
  public readonly deleteDisabled = input(false);
  public readonly editDisabled = input(false);
  public readonly loading = input(false);
  public readonly deleteLabel = input('Eliminar');
  public readonly editLabel = input('Editar');
  public readonly editIcon = input('pi pi-pencil');

  public readonly delete = output<Event>();
  public readonly edit = output<void>();
}
