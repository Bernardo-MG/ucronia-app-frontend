import { Component, input, output } from '@angular/core';
import { DrawerActions } from '@app/shared/ui/drawer-actions/drawer-actions';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'shared-drawer-form-actions',
  imports: [ButtonModule, DrawerActions],
  templateUrl: './drawer-form-actions.html',
  host: { class: 'block w-full' }
})
export class DrawerFormActions {
  public readonly formId = input<string | null>(null);
  public readonly submitLabel = input('Crear');
  public readonly submitIcon = input('pi pi-plus');
  public readonly disabled = input(false);
  public readonly loading = input(false);
  public readonly showCancel = input(true);
  public readonly cancelForm = output<void>();
}
