import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaction } from '@app/models/transaction';

@Component({
  selector: 'crud-form-transaction',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.sass']
})
export class TransactionFormComponent implements OnChanges {

  @Input() public data: Transaction = new Transaction();

  @Input() public disabledSave: boolean = false;

  @Input() public disabledDelete: boolean = false;

  @Output() public save = new EventEmitter<Transaction>();

  @Output() public delete = new EventEmitter<number>();

  public form: FormGroup = this.fb.group({
    id: [-1],
    description: ['', Validators.required],
    date: [new Date(), Validators.required],
    quantity: [0, Validators.required]
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['data'].firstChange) {
      this.form.patchValue(this.data);
    }
  }

  public saveData() {
    const transaction: Transaction = { ...this.form.value };

    const date = new Date(this.form.value.date);
    transaction.day = date.getDay();
    transaction.month = date.getMonth();
    transaction.year = date.getFullYear();

    this.save.emit(transaction);
  }

  public deleteData() {
    const id = this.form.get('id');

    if (id) {
      this.delete.emit(id.value);
    }
  }

  public canSave(): boolean {
    return ((!this.disabledSave) && (this.form.valid));
  }

  public canDelete(): boolean {
    return ((!this.disabledDelete) && (this.form.valid));
  }

}
