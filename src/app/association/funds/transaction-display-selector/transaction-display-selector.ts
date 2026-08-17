import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FundsDisplay } from '../funds-display';

@Component({
  selector: 'assoc-transaction-display-selector',
  imports: [FormsModule, SelectButtonModule],
  templateUrl: './transaction-display-selector.html'
})
export class TransactionDisplaySelector {

  public readonly view = output<FundsDisplay>();

  public statusOptions: any[] = [{ label: 'Calendario', value: FundsDisplay.CALENDAR }, { label: 'Lista', value: FundsDisplay.LIST }];
  public selectedStatus = FundsDisplay.CALENDAR;

}
