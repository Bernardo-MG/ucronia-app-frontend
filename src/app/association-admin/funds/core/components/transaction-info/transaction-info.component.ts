import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlButtonsComponent } from '@app/shared/form/components/control-buttons/control-buttons.component';
import { CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent, PlaceholderDirective } from '@bernardo-mg/layout';
import { Transaction } from '../../../../../models/transactions/transaction';

@Component({
    selector: 'assoc-transaction-info',
    imports: [CommonModule, PlaceholderDirective, ControlButtonsComponent, CardComponent, CardBodyComponent, CardFooterComponent, CardHeaderComponent],
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
