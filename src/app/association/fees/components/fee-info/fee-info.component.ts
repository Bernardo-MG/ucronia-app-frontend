import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconsModule } from '@app/shared/icons/icons.module';
import { Fee } from '../../models/fee';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'assoc-fee-info',
  standalone: true,
  imports: [CommonModule, IconsModule],
  templateUrl: './fee-info.component.html'
})
export class FeeInfoComponent {

  @Input() data = new Fee();

  @Output() public goToTransaction = new EventEmitter<number>();

  public selectTransaction() {
    this.goToTransaction.emit(this.data.transaction.index);
  }

  public isTransactionDisabled(): boolean {
    return this.data.transaction.date === null;
  }

}
