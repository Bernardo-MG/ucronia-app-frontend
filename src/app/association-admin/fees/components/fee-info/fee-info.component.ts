import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardModule } from '@app/shared/card/card.module';
import { ControlButtonsComponent } from '@app/shared/form/components/control-buttons/control-buttons.component';
import { IconSearchComponent } from '@app/shared/icons/components/icon-search/icon-search.component';
import { PlaceholderDirective } from '@app/shared/layout/directives/placeholder.directive';
import { Fee } from '../../../../models/fees/fee';

@Component({
    selector: 'assoc-fee-info',
    imports: [CommonModule, CardModule, IconSearchComponent, PlaceholderDirective, ControlButtonsComponent],
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
