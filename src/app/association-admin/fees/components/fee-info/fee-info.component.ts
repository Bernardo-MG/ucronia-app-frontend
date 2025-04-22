import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlButtonsComponent } from '@bernardo-mg/form';
import { IconSearchComponent } from '@bernardo-mg/icons';
import { CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent, PlaceholderDirective } from '@bernardo-mg/ui';
import { Fee } from '../../../../models/fees/fee';

@Component({
  selector: 'assoc-fee-info',
  imports: [CommonModule, IconSearchComponent, PlaceholderDirective, ControlButtonsComponent, CardComponent, CardBodyComponent, CardFooterComponent, CardHeaderComponent],
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
