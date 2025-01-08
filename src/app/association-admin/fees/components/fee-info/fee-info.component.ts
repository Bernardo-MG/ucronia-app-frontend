import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardModule } from '@app/shared/card/card.module';
import { FormModule } from '@app/shared/form/form.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { PlaceholderDirective } from '@app/shared/layout/directives/placeholder.directive';
import { Fee } from '../../../../models/fees/fee';

@Component({
  selector: 'assoc-fee-info',
  standalone: true,
  imports: [CommonModule, IconsModule, CardModule, FormModule, PlaceholderDirective],
  templateUrl: './fee-info.component.html'
})
export class FeeInfoComponent {

  @Input() public data = new Fee();

  @Input() public showMenu = false;

  @Input() public deletable = false;

  @Input() public editable = false;

  @Input() public waiting = false;

  @Output() public delete = new EventEmitter<void>();

  @Output() public startEditing = new EventEmitter<void>();

  @Output() public goToTransaction = new EventEmitter<number>();

  public selectTransaction() {
    this.goToTransaction.emit(this.data.transaction?.index);
  }

  public isTransactionDisabled(): boolean {
    return (this.waiting) || (this.data.transaction === null);
  }

}
