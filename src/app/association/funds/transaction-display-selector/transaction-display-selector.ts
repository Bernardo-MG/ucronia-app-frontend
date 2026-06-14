import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { Display } from '../funds-view/funds-view';

@Component({
  selector: 'assoc-transaction-display-selector',
  imports: [FormsModule, SelectButtonModule],
  templateUrl: './transaction-display-selector.html'
})
export class TransactionDisplaySelector {

  public readonly view = output<Display>();

  public statusOptions: any[] = [{ label: 'Calendario', value: Display.CALENDAR }, { label: 'Lista', value: Display.LIST }];
  public selectedStatus = Display.CALENDAR;

}
