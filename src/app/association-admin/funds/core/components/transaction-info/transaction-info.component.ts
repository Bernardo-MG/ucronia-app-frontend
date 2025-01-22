import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardModule } from '@app/shared/card/card.module';
import { ControlButtonsComponent } from '@app/shared/form/components/control-buttons/control-buttons.component';
import { PlaceholderDirective } from '@app/shared/layout/directives/placeholder.directive';
import { Transaction } from '../../../../../models/transactions/transaction';

@Component({
    selector: 'assoc-transaction-info',
    imports: [CommonModule, CardModule, PlaceholderDirective, ControlButtonsComponent],
    templateUrl: './transaction-info.component.html'
})
export class TransactionInfoComponent {

  @Input() public data = new Transaction();

  @Input() public showMenu = false;

  @Input() public deletable = false;

  @Input() public editable = false;

  @Input() public waiting = false;

  @Output() public delete = new EventEmitter<void>();

  @Output() public startEditing = new EventEmitter<void>();

}
