import { Component, input, OnChanges, output, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from '@openng/optimus-ui/selectbutton';
import { FundsDisplay } from '../funds-display';

@Component({
  selector: 'assoc-transaction-display-selector',
  imports: [FormsModule, SelectButtonModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './transaction-display-selector.html'
})
export class TransactionDisplaySelector implements OnChanges {

  public readonly display = input(FundsDisplay.LIST);

  public readonly view = output<FundsDisplay>();

  public selectedStatus = FundsDisplay.LIST;
  public readonly statusOptions = [
    { label: 'Calendario', value: FundsDisplay.CALENDAR, icon: 'pi pi-calendar' },
    { label: 'Lista', value: FundsDisplay.LIST, icon: 'pi pi-list' }
  ];

  // Lifecycle hooks
  public ngOnChanges(): void {
    this.selectedStatus = this.display();
  }

}
