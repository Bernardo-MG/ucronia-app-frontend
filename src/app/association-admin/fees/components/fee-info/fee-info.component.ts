
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Fee } from '@app/models/fees/fee';
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

  @Input() public data = new Fee();

  @Input() public showMenu = false;

  @Input() public deletable = false;

  @Input() public editable = false;

  @Input() public waiting = false;

  @Output() public delete = new EventEmitter<void>();

  @Output() public startEditing = new EventEmitter<void>();

  @Output() public goToTransaction = new EventEmitter<number>();

  public selectPayment() {
    this.goToTransaction.emit(this.data.payment?.index);
  }

  public isPaymentDisabled(): boolean {
    return (this.waiting) || (this.data.payment === null);
  }

}
