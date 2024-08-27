import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconsModule } from '@app/shared/icons/icons.module';
import { Fee } from '../../../shared/models/fee';
import { CommonModule } from '@angular/common';
import { FormModule } from '@app/shared/form/form.module';

@Component({
  selector: 'assoc-fee-info',
  standalone: true,
  imports: [CommonModule, IconsModule, FormModule],
  templateUrl: './fee-info.component.html'
})
export class FeeInfoComponent {

  @Input() public data = new Fee();

  @Input() public showMenu = false;

  @Input() public deletable = false;

  @Input() public editable = false;

  @Output() public delete = new EventEmitter<void>();

  @Output() public startEditing = new EventEmitter<void>();

  @Output() public goToTransaction = new EventEmitter<number>();

  public selectTransaction() {
    this.goToTransaction.emit(this.data.transaction.index);
  }

  public isTransactionDisabled(): boolean {
    return this.data.transaction.date === null;
  }

}
