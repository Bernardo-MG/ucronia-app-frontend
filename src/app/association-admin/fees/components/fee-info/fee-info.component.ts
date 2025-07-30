
import { Component, input, output } from '@angular/core';
import { Fee, FeeTransaction } from '@app/models/fees/fee';
import { ControlButtonsComponent } from '@bernardo-mg/form';
import { IconSearchComponent } from '@bernardo-mg/icons';
import { PlaceholderDirective } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'assoc-fee-info',
  imports: [CardModule, IconSearchComponent, PlaceholderDirective, ControlButtonsComponent],
  templateUrl: './fee-info.component.html'
})
export class FeeInfoComponent {

  public readonly data = input(new Fee());

  public readonly showMenu = input(false);

  public readonly deletable = input(false);

  public readonly editable = input(false);

  public readonly waiting = input(false);

  public readonly delete = output<void>();

  public readonly startEditing = output<void>();

  public readonly goToTransaction = output<number>();

  public selectPayment() {
    if (this.data().payment) {
      const payment = this.data().payment as FeeTransaction
      this.goToTransaction.emit(payment.index);
    }
  }

  public isPaymentDisabled(): boolean {
    return (this.waiting()) || (this.data().payment === null);
  }

}
