import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { Failure } from '@app/core/api/models/failure';
import { FormDescription } from '@app/shared/edition/models/form-description';

@Component({
  selector: 'assoc-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.sass']
})
export class TransactionFormComponent {

  @Input() public data: any;

  @Input() public failures: Failure[] = [];

  @Input() public saving = false;

  @Output() public save = new EventEmitter<any>();

  public fields: FormDescription[] = [
    new FormDescription('Description', 'description', 'string', Validators.required),
    new FormDescription('Date', 'date', 'date', Validators.required),
    new FormDescription('Amount', 'amount', 'float', Validators.required)
  ];

  public onSave(data: any): void {
    this.save.emit(data);
  }

}
