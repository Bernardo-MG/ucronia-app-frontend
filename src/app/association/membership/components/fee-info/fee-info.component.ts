import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Fee } from '../../models/fee';

@Component({
  selector: 'assoc-fee-info',
  templateUrl: './fee-info.component.html'
})
export class FeeInfoComponent {

  @Input() data = new Fee();

  @Output() public goToTransaction = new EventEmitter<number>();

  public selectTransaction() {
    this.goToTransaction.emit(this.data.transactionIndex);
  }

  public isTransactionDisabled(): boolean {
    return this.data.paymentDate === null;
  }

}
