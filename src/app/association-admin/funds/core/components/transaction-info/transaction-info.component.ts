
import { Component, input, output } from '@angular/core';
import { Transaction } from '@app/models/transactions/transaction';
import { ControlButtonsComponent } from '@bernardo-mg/form';
import { PlaceholderDirective } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'assoc-transaction-info',
  imports: [CardModule, PlaceholderDirective, ControlButtonsComponent],
  templateUrl: './transaction-info.component.html'
})
export class TransactionInfoComponent {

  public readonly data = input(new Transaction());

  public readonly showMenu = input(false);

  public readonly deletable = input(false);

  public readonly editable = input(false);

  public readonly waiting = input(false);

  public readonly delete = output<void>();

  public readonly startEditing = output<void>();

}
