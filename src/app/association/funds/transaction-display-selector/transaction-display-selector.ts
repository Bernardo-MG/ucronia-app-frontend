import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'assoc-transaction-display-selector',
  imports: [FormsModule, SelectButtonModule],
  templateUrl: './transaction-display-selector.html'
})
export class TransactionDisplaySelector {

  public readonly view = output<'calendar' | 'list'>();

  public statusOptions: any[] = [{ label: 'Calendario', value: 'calendar' }, { label: 'Lista', value: 'list' }];
  public selectedStatus: 'calendar' | 'list' = 'calendar';

}
