import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardBodyComponent } from '@app/shared/card/components/card-body/card-body.component';
import { CardFooterComponent } from '@app/shared/card/components/card-footer/card-footer.component';
import { CardHeaderComponent } from '@app/shared/card/components/card-header/card-header.component';
import { CardComponent } from '@app/shared/card/components/card/card.component';
import { ControlButtonsComponent } from '@app/shared/form/components/control-buttons/control-buttons.component';
import { IconSearchComponent } from '@bernardo-mg/icons';
import { PlaceholderDirective } from '@bernardo-mg/layout';
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
