import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Fee } from '../../../membership/models/fee';

@Component({
  selector: 'assoc-fee-info',
  templateUrl: './fee-info.component.html'
})
export class FeeInfoComponent {

  @Input() fee = new Fee();

  @Output() public goToTransaction = new EventEmitter<number>();

  public selectTransaction() {
    this.goToTransaction.emit(this.fee.transaction.index);
  }

  public isTransactionDisabled(): boolean {
    return this.fee.transaction.date === null;
  }

}
