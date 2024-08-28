import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormModule } from '@app/shared/form/form.module';
import { Transaction } from '../../../shared/models/transaction';
import { CardModule } from '@app/shared/card/card.module';

@Component({
  selector: 'assoc-transaction-info',
  standalone: true,
  imports: [CommonModule, FormModule, CardModule],
  templateUrl: './transaction-info.component.html'
})
export class TransactionInfoComponent {

  @Input() public data = new Transaction();

  @Input() public showMenu = false;

  @Input() public deletable = false;

  @Input() public editable = false;

  @Output() public delete = new EventEmitter<void>();

  @Output() public startEditing = new EventEmitter<void>();

}
